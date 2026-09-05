import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import {
  downloadWhisperModel,
  installWhisperCpp,
  toCaptions,
  transcribe,
} from "@remotion/install-whisper-cpp";
import { getFfmpeg } from "./ffmpeg.mjs";

// Multilingual model — the `.en` variants cannot read Spanish at all.
// `medium` is the accuracy/size balance that handles accents and gym
// vocabulary reliably; drop to `small` if the download is too heavy.
const MODEL = "medium";
const WHISPER_VERSION = "1.5.5";
const LANGUAGE = "es";

const VIDEO_EXTENSIONS = [".mov", ".mp4", ".m4v", ".webm"];

const publicDir = join(process.cwd(), "public");
const sourceDir = join(publicDir, "day0");
const captionsDir = join(publicDir, "captions");
const whisperDir = join(process.cwd(), "whisper.cpp");
const tmpDir = join(process.cwd(), "node_modules", ".cache", "transcribe");

const main = async () => {
  const ffmpeg = await getFfmpeg();

  let entries;
  try {
    entries = await readdir(sourceDir);
  } catch {
    console.error(`Expected your numbered clips in ${sourceDir}`);
    console.error(`Name them 01.mov, 02.mov ... 07.mov`);
    process.exit(1);
  }

  const clips = entries
    .filter((name) =>
      VIDEO_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext)),
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (clips.length === 0) {
    console.error(`No video files in ${sourceDir}`);
    process.exit(1);
  }

  console.log(`Installing whisper.cpp (first run downloads ~1.5GB)...\n`);
  await installWhisperCpp({ to: whisperDir, version: WHISPER_VERSION });
  await downloadWhisperModel({ model: MODEL, folder: whisperDir });

  await mkdir(captionsDir, { recursive: true });
  await mkdir(tmpDir, { recursive: true });

  for (const clip of clips) {
    const { name } = parse(clip);
    console.log(`\nTranscribing ${clip}...`);

    // whisper.cpp only accepts 16kHz mono wav.
    const wav = join(tmpDir, `${name}.wav`);
    await ffmpeg.run([
      "-y",
      "-i",
      join(sourceDir, clip),
      "-ar",
      "16000",
      "-ac",
      "1",
      wav,
    ]);

    const whisperCppOutput = await transcribe({
      model: MODEL,
      whisperPath: whisperDir,
      whisperCppVersion: WHISPER_VERSION,
      inputPath: wav,
      tokenLevelTimestamps: true,
      language: LANGUAGE,
      // The dialogue stays in Spanish. Never translate.
      translateToEnglish: false,
    });

    const { captions } = toCaptions({ whisperCppOutput });
    const out = join(captionsDir, `${name}.json`);
    await writeFile(out, JSON.stringify(captions, null, 2));

    const text = captions
      .map((c) => c.text)
      .join("")
      .trim();
    console.log(`  -> public/captions/${name}.json (${captions.length} tokens)`);
    console.log(`  ${text.slice(0, 160)}${text.length > 160 ? "..." : ""}`);
  }

  console.log(`\nDone. Commit the captions so they can be reviewed:`);
  console.log(`  git add public/captions && git commit -m "Add captions" && git push`);
};

await main();
