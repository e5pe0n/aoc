import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string, L: number): string {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
  const bytes = lines.map(
    (line) => line.split(",").map(Number) as [number, number],
  );
  const M = range(L).map(() => range(L).map(() => "."));
  for (const b of bytes) {
    M[b[1]]![b[0]] = "#";
  }
  function inMap(y: number, x: number): boolean {
    return 0 <= x && x < L && 0 <= y && y < L;
  }
  for (const b of bytes.reverse()) {
    M[b[1]]![b[0]] = ".";
    const visited = range(L).map(() => range(L).map(() => false));
    const q: [number, number][] = [[L - 1, L - 1]];
    while (q.length > 0) {
      const [y, x] = q.pop()!;
      if (y === 0 && x === 0) {
        return b.join(",");
      }
      for (const [dy, dx] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ] as const) {
        const ny = y + dy;
        const nx = x + dx;
        if (inMap(ny, nx) && M[ny]![nx] !== "#" && !visited[ny]![nx]) {
          visited[ny]![nx] = true;
          q.push([ny, nx]);
        }
      }
    }
  }
  throw new Error("No solution found");
}
