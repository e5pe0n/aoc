import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Direction = "^" | "v" | "<" | ">";

type Gurd = {
  i: number;
  j: number;
  d: Direction;
};

const dd = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
} as const;

function turnRight(d: Direction): Direction {
  switch (d) {
    case "^":
      return ">";
    case "v":
      return "<";
    case "<":
      return "^";
    case ">":
      return "v";
  }
}

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const M = fs
    .readFileSync(fp, "utf-8")
    .split("\n")
    .slice(0, -1)
    .map((line) => line.split(""));

  const H = M.length;
  const W = M[0]!.length;

  const visited = range(H).map(() => range(W).map(() => false));

  function findStart(): [number, number] {
    for (let i = 0; i < H; ++i) {
      for (let j = 0; j < W; ++j) {
        if (M[i]![j]! === "^") {
          M[i]![j]! = ".";
          return [i, j];
        }
      }
    }
    throw new Error("No start found");
  }

  const start: [number, number] = findStart();

  function inMap(i: number, j: number): boolean {
    return 0 <= i && i < H && 0 <= j && j < W;
  }

  function bfs() {
    const q: Gurd[] = [{ i: start[0], j: start[1], d: "^" }];
    while (q.length > 0) {
      const { i, j, d } = q.pop()!;
      if (!inMap(i, j)) {
        break;
      }
      if (M[i]![j] === "#") {
        break;
      }
      visited[i]![j] = true;
      const di = dd[d][0];
      const dj = dd[d][1];
      let nd = d;
      if (inMap(i + di, j + dj) && M[i + di]![j + dj] === "#") {
        nd = turnRight(d);
      }
      q.push({ i: i + dd[nd][0], j: j + dd[nd][1], d: nd });
    }
  }

  bfs();

  let res = 0;
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      res += Number(visited[i]![j]!);
    }
  }
  return res;
}
