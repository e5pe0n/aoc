import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = ["^", ">", "v", "<"] as const;

function getnd(d: Dir): [Dir, Dir, Dir] {
  const i = dirs.indexOf(d);
  return [dirs[(i + 1) % 4]!, d, dirs[(i + 3) % 4]!];
}

const didjs = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
} as const;

type Dir = keyof typeof didjs;

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const M = content.split("\n").map((line) => line.split(""));
  const H = M.length;
  const W = M[0]!.length;
  function find(c: string): [number, number] {
    for (let i = 0; i < H; ++i) {
      for (let j = 0; j < W; ++j) {
        if (M[i]![j] === c) {
          return [i, j];
        }
      }
    }
    throw new Error(`${c} not found`);
  }
  function inMap(i: number, j: number): boolean {
    return i >= 0 && i < H && j >= 0 && j < W;
  }
  const start = find("S");
  const end = find("E");
  const visited = range(H).map(() =>
    range(W).map(() => ({
      "^": Number.MAX_SAFE_INTEGER,
      ">": Number.MAX_SAFE_INTEGER,
      v: Number.MAX_SAFE_INTEGER,
      "<": Number.MAX_SAFE_INTEGER,
    })),
  );
  visited[start[0]]![start[1]] = {
    "^": Number.MAX_SAFE_INTEGER,
    ">": 0,
    v: Number.MAX_SAFE_INTEGER,
    "<": Number.MAX_SAFE_INTEGER,
  };
  const q: [number, number, Dir, number][] = [[start[0], start[1], ">", 0]];
  while (q.length > 0) {
    const [i, j, d, score] = q.pop()!;
    if (i === end[0] && j === end[1]) {
      continue;
    }
    for (const nd of getnd(d)) {
      const [di, dj] = didjs[nd];
      const ni = i + di;
      const nj = j + dj;
      const nscore = score + (d === nd ? 1 : 1001);
      if (
        inMap(ni, nj) &&
        M[ni]![nj] !== "#" &&
        visited[ni]![nj]![nd as Dir] > nscore
      ) {
        visited[ni]![nj]![nd as Dir] = nscore;
        q.push([ni, nj, nd as Dir, nscore]);
      }
    }
  }
  const res = Math.min(...Object.values(visited[end[0]]![end[1]]!));
  return res;
}
