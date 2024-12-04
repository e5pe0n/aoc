import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const s = fs.readFileSync(fp, "utf-8").split("\n").slice(0, -1);

  const H = s.length;
  const W = s[0]!.length;

  function cnt(i: number, j: number): number {
    let sum = 0;
    for (const f of [right, down, downRight, upRight]) {
      const t = f(i, j);
      if (t === "XMAS") {
        ++sum;
      }
      if (t === "SAMX") {
        ++sum;
      }
    }
    return sum;
  }

  function right(i: number, j: number): string | undefined {
    if (0 <= j && j + 3 < W) {
      return s[i]!.slice(j, j + 4);
    }
    return undefined;
  }

  function down(i: number, j: number): string | undefined {
    if (0 <= i && i + 3 < H) {
      let t = "";
      for (let k = i; k < i + 4; ++k) {
        t += s[k]![j]!;
      }
      return t;
    }
    return undefined;
  }

  function downRight(i: number, j: number): string | undefined {
    if (0 <= i && i + 3 < H && 0 <= j && j + 3 < W) {
      let t = "";
      for (let k = 0; k < 4; ++k) {
        t += s[i + k]![j + k]!;
      }
      return t;
    }
    return undefined;
  }

  function upRight(i: number, j: number): string | undefined {
    if (0 <= i - 3 && i < H && 0 <= j && j + 3 < W) {
      let t = "";
      for (let k = 0; k < 4; ++k) {
        t += s[i - k]![j + k]!;
      }

      return t;
    }
    return undefined;
  }

  let sum = 0;
  for (let i = 0; i < s.length; ++i) {
    for (let j = 0; j < s[0]!.length; ++j) {
      sum += cnt(i, j);
    }
  }
  return sum;
}
