import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const s = fs.readFileSync(fp, "utf-8");
  const RE = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const ms = s.matchAll(RE);
  let sum = 0;
  for (const m of ms) {
    const [, a, b] = m;
    sum += Number.parseInt(a!) * Number.parseInt(b!);
  }
  return sum;
}
