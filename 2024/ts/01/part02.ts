import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const s = fs.readFileSync(fp, "utf-8");
  const left: number[] = [];
  const right: number[] = [];
  for (const line of s.split("\n").slice(0, -1)) {
    const [l, r] = line.split(/\s+/);
    left.push(Number.parseInt(l));
    right.push(Number.parseInt(r));
  }
  const m = new Map<number, number>();
  for (const r of right) {
    m.set(r, (m.get(r) ?? 0) + 1);
  }
  let sum = 0;
  for (let i = 0; i < left.length; ++i) {
    sum += left[i]! * (m.get(left[i]!) ?? 0);
  }
  return sum;
}
