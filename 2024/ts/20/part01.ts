import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Cnt = new Map<number, number>();

export function solveExample(filename: string) {
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
  function bfs2(ii: number, jj: number) {
    const q: [number, number, number, number][] = [[ii, jj, D[ii]![jj]!, 0]];
    while (q.length > 0) {
      const [i, j, d, c] = q.pop()!;
      if (c === 2) {
        const diff = D[i]![j]! - d;
        if (M[i]![j] !== "#" && diff > 0) {
          Cnt.set(diff, (Cnt.get(diff) ?? 0) + 1);
        }
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
        if (inMap(ni, nj)) {
          q.push([ni, nj, d + 1, c + 1]);
        }
      }
    }
  }
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (M[i]![j] === "." || M[i]![j] === "S") {
        bfs2(i, j);
      }
    }
  }

  return Array.from(Cnt.entries())
    .map(([k, v]) => [v, k] as const)
    .sort(([k1, v1], [k2, v2]) => v1 - v2);
}

export function solve(filename: string): number {
  solveExample(filename);
  let res = 0;
  for (const [diff, cnt] of Cnt) {
    if (diff >= 100) {
      res += cnt;
    }
  }
  return res;
}
