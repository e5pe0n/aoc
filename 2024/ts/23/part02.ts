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

  let maxClique: Set<string> = new Set();
  function bronKerbosh(R: Set<string>, P: Set<string>, X: Set<string>) {
    if (P.size === 0 && X.size === 0) {
      if (R.size > maxClique.size) {
        maxClique = R;
      }
      return;
    }
    for (const v of P) {
      const Nv = G.get(v)!;
      bronKerbosh(
        new Set([...R, v]),
        new Set([...P].filter((u) => Nv.has(u))),
        new Set([...X].filter((u) => Nv.has(u))),
      );
      P.delete(v);
      X.add(v);
    }
  }

  bronKerbosh(new Set(), new Set(G.keys()), new Set());

  const res = [...maxClique].sort().join(",");
  return res;
}
