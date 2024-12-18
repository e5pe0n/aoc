import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string, L: number, B: number): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
  const bytes = lines.map(
    (line) => line.split(",").map(Number) as [number, number],
  );
  const M = range(L).map(() => range(L).map(() => "."));
  for (const b of bytes.slice(0, B)) {
    M[b[1]]![b[0]] = "#";
  }
  function inMap(y: number, x: number): boolean {
    return 0 <= x && x < L && 0 <= y && y < L;
  }
  const dists = range(L).map(() => range(L).map(() => Number.MAX_SAFE_INTEGER));
  dists[0]![0] = 0;
  const q: [number, number, number][] = [[0, 0, 0]];
  while (q.length > 0) {
    const [y, x, d] = q.pop()!;
    if (y === L - 1 && x === L - 1) {
      continue;
    }
    for (const [dy, dx] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ] as const) {
      const ny = y + dy;
      const nx = x + dx;
      if (inMap(ny, nx) && M[ny]![nx] !== "#" && dists[ny]![nx]! > d + 1) {
        dists[ny]![nx] = d + 1;
        q.push([ny, nx, d + 1]);
      }
    }
  }
  return dists[L - 1]![L - 1]!;
}
