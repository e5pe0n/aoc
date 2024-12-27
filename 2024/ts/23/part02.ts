import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): string {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs
    .readFileSync(fp, "utf-8")
    .trim()
    .split("\n")
    .map((line) => line.trim());
  const G = new Map<string, Set<string>>();
  for (const line of lines) {
    const [u, v] = line.split("-") as [string, string];
    G.set(u, (G.get(u) ?? new Set()).add(v));
    G.set(v, (G.get(v) ?? new Set()).add(u));
  }
  let largest = new Set<string>();
  let largestSize = 0;
  for (const [u, vs] of G) {
    largestSize = Math.max(largestSize, vs.size);
    let inner = new Set<string>(vs);
    inner.add(u);
    for (const v of vs) {
      const ws = new Set(G.get(v)!);
      ws.add(v);
      const newInner = new Set<string>();
      for (const w of ws) {
        if (inner.has(w)) {
          newInner.add(w);
        }
      }
      inner = newInner;
    }
    if (inner.size > largest.size) {
      largest = inner;
    }
  }
  console.log(largestSize);
  const res = Array.from(largest).sort().join(",");
  return res;
}
