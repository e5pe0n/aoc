import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
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
  const tri = new Set<string>();
  for (const [u1, vs1] of GG) {
    for (let i = 0; i < vs1.length - 1; ++i) {
      const u2 = vs1[i]!;
      const vs2 = GG.get(u2)!;
      for (let j = i + 1; j < vs1.length; ++j) {
        if (vs2.includes(vs1[j]!)) {
          tri.add([u1, u2, vs1[j]!].sort().join(","));
        }
      }
    }
  }
  let res = 0;
  for (const t of tri) {
    if (t.split(",").some((v) => v.startsWith("t"))) {
      ++res;
    }
  }
  return res;
}
