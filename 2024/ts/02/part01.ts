import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string) {
  const fp = path.resolve(path.join(__dirname, filename));
  const s = fs.readFileSync(fp, "utf-8");
  const reports: number[][] = [];
  for (const line of s.split("\n").slice(0, -1)) {
    reports.push(line.split(/\s+/).map(Number));
  }
  const diffs: number[][] = [];
  for (let i = 0; i < reports.length; ++i) {
    diffs.push([]);
    for (let j = 0; j < reports[i]!.length - 1; ++j) {
      diffs[i]!.push(reports[i]![j]! - reports[i]![j + 1]!);
    }
  }
  let sum = 0;
  for (let i = 0; i < diffs.length; ++i) {
    let safe = true;
    for (let j = 0; j < diffs[i]!.length - 1; ++j) {
      if (diffs[i]![j]! * diffs[i]![j + 1]! < 0) {
        safe = false;
        break;
      }
    }
    const abss = diffs[i]!.map(Math.abs);
    if (!(1 <= Math.min(...abss) && Math.max(...abss) <= 3)) {
      safe = false;
    }
    if (safe) {
      sum += 1;
    }
  }
  return sum;
}
