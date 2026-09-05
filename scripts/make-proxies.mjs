import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { getFfmpeg } from "./ffmpeg.mjs";

// Proxies exist so the footage can be reviewed and edited remotely without
// moving gigabytes around. They are deliberately tiny: the final render still
// uses the originals, which never leave this machine.
const PROXY_WIDTH = 360;
const PROXY_CRF = 32;

const VIDEO_EXTENSIONS = [".mov", ".mp4", ".m4v", ".webm"];

const publicDir = join(process.cwd(), "public");
const proxyDir = join(publicDir, "proxies");

const collectVideos = async (dir, prefix = "") => {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];

  for (const entry of entries) {
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.name === "proxies") continue;
    if (entry.isDirectory()) {
      found.push(...(await collectVideos(join(dir, entry.name), relPath)));
    } else if (
      VIDEO_EXTENSIONS.some((ext) => entry.name.toLowerCase().endsWith(ext))
    ) {
      found.push(relPath);
    }
  }

  return found;
};

const main = async () => {
  const ffmpeg = await getFfmpeg();
  const sources = (await collectVideos(publicDir)).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

  if (sources.length === 0) {
    console.error(`No video files found under ${publicDir}`);
    process.exit(1);
  }

  console.log(`Making ${sources.length} proxies at ${PROXY_WIDTH}px wide...\n`);

  let totalBytes = 0;

  for (const [index, src] of sources.entries()) {
    // Proxies keep the original name so the edit maps 1:1 onto the originals.
    const out = join(proxyDir, src.replace(/\.[^.]+$/, ".mp4"));
    await mkdir(dirname(out), { recursive: true });

    await ffmpeg.run([
      "-y",
      "-i",
      join(publicDir, src),
      "-vf",
      `scale=${PROXY_WIDTH}:-2`,
      "-c:v",
      "libx264",
      "-crf",
      String(PROXY_CRF),
      "-preset",
      "veryfast",
      "-pix_fmt",
      "yuv420p",
      "-an",
      out,
    ]);

    const { size } = await stat(out);
    totalBytes += size;
    console.log(
      `  [${String(index + 1).padStart(2)}/${sources.length}] ` +
        `${src.padEnd(44)} ${(size / 1024 / 1024).toFixed(2)} MB`,
    );
  }

  console.log(
    `\nWrote ${sources.length} proxies to ${relative(process.cwd(), proxyDir)} — ` +
      `${(totalBytes / 1024 / 1024).toFixed(1)} MB total.`,
  );
  console.log(
    `\nCommit and push just that folder:\n` +
      `  git add public/proxies && git commit -m "Add proxies" && git push`,
  );
};

await main();
