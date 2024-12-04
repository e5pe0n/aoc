import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const s = fs.readFileSync(fp, "utf-8").split("\n").slice(0, -1);

  let sum = 0;
  for (let i = 1; i < s.length - 1; ++i) {
    for (let j = 1; j < s[0]!.length - 1; ++j) {
      const t1 = s[i - 1]![j - 1]! + s[i]![j]! + s[i + 1]![j + 1]!;
      const t2 = s[i - 1]![j + 1]! + s[i]![j]! + s[i + 1]![j - 1]!;
      if ((t1 === "MAS" || t1 === "SAM") && (t2 === "MAS" || t2 === "SAM")) {
        ++sum;
      }
    }
  }
  return sum;
}
