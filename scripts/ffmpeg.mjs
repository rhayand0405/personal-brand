import { execFile } from "node:child_process";
import { access, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

// Remotion ships ffmpeg next to the shared libraries it links against
// (.dylib on macOS, .so on Linux). Invoking the binary without pointing the
// dynamic linker at that directory fails to resolve them, so every call has
// to carry the library path.
const envFor = (dir) => ({
  ...process.env,
  DYLD_LIBRARY_PATH: [dir, process.env.DYLD_LIBRARY_PATH]
    .filter(Boolean)
    .join(":"),
  LD_LIBRARY_PATH: [dir, process.env.LD_LIBRARY_PATH].filter(Boolean).join(":"),
});

const candidates = async () => {
  const compositorRoot = join(process.cwd(), "node_modules", "@remotion");
  const found = [];

  let entries;
  try {
    entries = await readdir(compositorRoot);
  } catch {
    return found;
  }

  for (const name of entries) {
    if (!name.startsWith("compositor-")) continue;
    found.push(join(compositorRoot, name));
  }

  return found;
};

/**
 * Resolves a usable ffmpeg, returning a run() that already carries the right
 * library path. Falls back to whatever ffmpeg is on PATH.
 */
export const getFfmpeg = async () => {
  const dirs = await candidates();
  const tried = [];

  for (const dir of dirs) {
    const binary = join(dir, "ffmpeg");
    try {
      await access(binary, constants.X_OK);
      await execFileAsync(binary, ["-version"], { env: envFor(dir) });
      return {
        binary,
        run: (args) => execFileAsync(binary, args, { env: envFor(dir) }),
      };
    } catch (err) {
      tried.push(`${binary}: ${err.message.split("\n")[0]}`);
    }
  }

  // A system ffmpeg is a perfectly good fallback and is often already present
  // on machines that have Homebrew.
  try {
    await execFileAsync("ffmpeg", ["-version"]);
    return {
      binary: "ffmpeg",
      run: (args) => execFileAsync("ffmpeg", args),
    };
  } catch {
    tried.push("ffmpeg on PATH: not found");
  }

  throw new Error(
    `Could not find a working ffmpeg.\nTried:\n  ${tried.join("\n  ")}\n\n` +
      `If node_modules/@remotion/compositor-* is missing, run npm install.`,
  );
};
