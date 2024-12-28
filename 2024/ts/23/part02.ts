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
  const GG = new Map<string, string[]>(
    Array.from(G.entries()).map(([u, vs]) => [u, Array.from(vs)]),
  );
  const triSet = new Set<string>();
  for (const [u1, vs1] of GG) {
    for (let i = 0; i < vs1.length - 1; ++i) {
      const u2 = vs1[i]!;
      const vs2 = GG.get(u2)!;
      for (let j = i + 1; j < vs1.length; ++j) {
        if (vs2.includes(vs1[j]!)) {
          triSet.add([u1, u2, vs1[j]!].sort().join(","));
        }
      }
    }
  }
  let prevs = Array.from(triSet);
  let nexts: string[] = [];
  while (true) {
    for (let i = 0; i < prevs.length - 1; ++i) {
      for (let j = i + 1; j < prevs.length; ++j) {
        const us = prevs[i]!.split(",");
        const vs = prevs[j]!.split(",");
        const ws = new Set<string>([...us, ...vs]);
        if (ws.size - us.length === 1) {
          const diffs: string[] = [];
          for (const w of ws) {
            if (!us.includes(w) || !vs.includes(w)) {
              diffs.push(w);
            }
          }
          if (G.get(diffs[0]!)?.has(diffs[1]!)) {
            nexts.push([...ws].sort().join(","));
          }
        }
      }
    }
    if (nexts.length === 0) {
      break;
    }
    prevs = Array.from(new Set(nexts));
    nexts = [];
  }
  const res = prevs[0]!;
  return res;
}
