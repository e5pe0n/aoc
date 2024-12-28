import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
} as const;
type Dir = keyof typeof dirs;

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
    const sides = range(H).map(() =>
      range(W).map(() => ({
        "^": false,
        ">": false,
        v: false,
        "<": false,
      })),
    );
    let area = 0;
    while (q.length > 0) {
      const [i, j] = q.pop()!;
      if (visited[i]![j]) {
        continue;
      }
      visited[i]![j] = true;
      ++area;
      for (const [d, [di, dj]] of Object.entries(dirs) as [
        Dir,
        [number, number],
      ][]) {
        const ni = i + di;
        const nj = j + dj;
        if (inMap(ni, nj) && M[ni]![nj] === plant) {
          q.push([ni, nj]);
        } else {
          sides[i]![j]![d] = true;
        }
      }
    }
    let perimeter = 0;
    for (let i = 0; i < H; ++i) {
      let j = 0;
      while (j < W) {
        while (j < W && !sides[i]![j]!["^"]) {
          ++j;
        }
        let found = false;
        while (j < W && sides[i]![j]!["^"]) {
          ++j;
          found = true;
        }
        if (found) {
          ++perimeter;
        }
      }
      j = 0;
      while (j < W) {
        while (j < W && !sides[i]![j]!["v"]) {
          ++j;
        }
        let found = false;
        while (j < W && sides[i]![j]!["v"]) {
          ++j;
          found = true;
        }
        if (found) {
          ++perimeter;
        }
      }
    }
    for (let j = 0; j < W; ++j) {
      let i = 0;
      while (i < H) {
        while (i < H && !sides[i]![j]!["<"]) {
          ++i;
        }
        let found = false;
        while (i < H && sides[i]![j]!["<"]) {
          ++i;
          found = true;
        }
        if (found) {
          ++perimeter;
        }
      }
      i = 0;
      while (i < H) {
        while (i < H && !sides[i]![j]![">"]) {
          ++i;
        }
        let found = false;
        while (i < H && sides[i]![j]![">"]) {
          ++i;
          found = true;
        }
        if (found) {
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
