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
  const M = content.split("\n").map((line) => line.split("").map(Number));
  const H = M.length;
  const W = M[0]!.length;

  function inMap(i: number, j: number): boolean {
    return 0 <= i && i < H && 0 <= j && j < W;
  }

  function bfs(i: number, j: number): number {
    const visited = range(H).map(() => range(W).map(() => false));
    const q: [number, number, number][] = [[i, j, 0]];
    let score = 0;
    while (q.length > 0) {
      const [i, j, h] = q.pop()!;
      if (visited[i]![j]) {
        continue;
      }
      visited[i]![j] = true;
      if (M[i]![j] === 9) {
        ++score;
        continue;
      }
      for (const [di, dj] of didj) {
        const ni = i + di;
        const nj = j + dj;
        if (
          inMap(ni, nj) &&
          !visited[ni]![nj] &&
          M[ni]![nj]! - M[i]![j]! === 1
        ) {
          q.push([ni, nj, h + 1]);
        }
      }
    }
    return score;
  }

  let res = 0;
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (M[i]![j] === 0) {
        const score = bfs(i, j);
        res += score;
      }
    }
  }
  return res;
}
