import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Cnt = new Map<number, number>();

export function solveExample(filename: string, N: number) {
  const fp = path.resolve(path.join(__dirname, filename));
  const M = fs
    .readFileSync(fp, "utf-8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));
  const H = M.length;
  const W = M[0]!.length;

  function findS(): [number, number] {
    for (let i = 0; i < H; ++i) {
      for (let j = 0; j < W; ++j) {
        if (M[i]![j] === "S") {
          return [i, j];
        }
      }
    }
    throw new Error("start not found");
  }

  function findE(): [number, number] {
    for (let i = 0; i < H; ++i) {
      for (let j = 0; j < W; ++j) {
        if (M[i]![j] === "E") {
          return [i, j];
        }
      }
    }
    throw new Error("end not found");
  }

  function inMap(i: number, j: number): boolean {
    return 0 <= i && i < H && 0 <= j && j < W;
  }

  const start = findS();
  const end = findE();
  const D = range(H).map(() => range(W).map(() => Number.MAX_SAFE_INTEGER));
  D[start[0]]![start[1]] = 0;
  function bfs() {
    const q: [number, number, number][] = [[start[0], start[1], 0]];
    while (q.length > 0) {
      const [i, j, d] = q.pop()!;
      if (i === end[0] && j === end[1]) {
        continue;
      }
      for (const [di, dj] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ] as const) {
        const ni = i + di;
        const nj = j + dj;
        if (inMap(ni, nj) && M[ni]![nj] !== "#" && D[ni]![nj]! > d + 1) {
          D[ni]![nj] = d + 1;
          q.push([ni, nj, d + 1]);
        }
      }
    }
  }
  bfs();
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (M[i]![j] === "." || M[i]![j] === "S") {
        for (let ii = i - 20; ii <= i + 20; ++ii) {
          for (let jj = j - 20; jj <= j + 20; ++jj) {
            const d = Math.abs(ii - i) + Math.abs(jj - j);
            if (
              d <= 20 &&
              inMap(ii, jj) &&
              (M[ii]![jj] === "." || M[ii]![jj] === "E")
            ) {
              const diff = D[ii]![jj]! - (D[i]![j]! + d);
              if (diff >= N) {
                Cnt.set(diff, (Cnt.get(diff) ?? 0) + 1);
              }
            }
          }
        }
      }
    }
  }

  return Array.from(Cnt.entries())
    .map(([k, v]) => [v, k] as const)
    .sort(([k1, v1], [k2, v2]) => v1 - v2);
}

export function solve(filename: string, N: number): number {
  solveExample(filename, N);
  let res = 0;
  for (const [diff, cnt] of Cnt) {
    if (diff >= 100) {
      res += cnt;
    }
  }
  return res;
}
