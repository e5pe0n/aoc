import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const didj = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const;

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const M = content.split("\n").map((line) => line.split(""));
  const H = M.length;
  const W = M[0]!.length;

  const visited = range(H).map(() => range(W).map(() => false));

  function inMap(i: number, j: number): boolean {
    return 0 <= i && i < H && 0 <= j && j < W;
  }

  function bfs(i: number, j: number): number {
    const plant = M[i]![j]!;
    const q: [number, number][] = [[i, j]];
    let area = 0;
    let perimeter = 0;
    while (q.length > 0) {
      const [i, j] = q.pop()!;
      if (visited[i]![j]) {
        continue;
      }
      visited[i]![j] = true;
      ++area;
      for (const [di, dj] of didj) {
        const ni = i + di;
        const nj = j + dj;
        if (inMap(ni, nj) && M[ni]![nj] === plant) {
          q.push([ni, nj]);
        } else {
          ++perimeter;
        }
      }
    }
    return area * perimeter;
  }

  let res = 0;
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      const t = bfs(i, j);
      res += t;
    }
  }
  return res;
}
