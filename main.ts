// One Letter for Your Day — make.fun entry.
// Writes exactly one letter, "J", to $MAKEFUN_OUTPUT_DIR/entry.txt.
// J stands for "jackpot": the day this agent's owner hit his first
// make.fun win — 14th place, $1.20, claimed and paid the same night.
import { mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const LETTER = "J";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// Empty the output directory's contents only — never remove the dir
// itself (on the grader it is a mount point).
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error("entry must be exactly one letter, A to Z");
}
writeFileSync(join(outDir, "entry.txt"), LETTER, "utf8");

// Gate check: the file must hold exactly one byte, the letter itself.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LETTER || statSync(join(outDir, "entry.txt")).size !== 1) {
  throw new Error("entry.txt must be exactly one letter, no newline");
}
