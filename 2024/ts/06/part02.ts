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

  // function windStart() {
  //   while (inMap(start[0], start[1]) && M[start[0]]![start[1]] !== "#") {
  //     start[0] -= dd["^"][0];
  //     start[1] -= dd["^"][1];
  //   }
  //   start[0] += dd["^"][0];
  //   start[1] += dd["^"][1];
  // }

  // windStart();

  // console.log("start:", start);

  const visited = range(H).map(() => range(W).map(() => new Set<Direction>()));
  const turned = range(H).map(() => range(W).map(() => false));
  const ranks = range(H).map(() => range(W).map(() => 0));

  function bfs() {
    const q: (Gurd & { rank: number })[] = [
      { i: start[0], j: start[1], d: "^", rank: 0 },
    ];
    while (q.length > 0) {
      const { i, j, d, rank } = q.pop()!;
      if (!inMap(i, j)) {
        break;
      }
      if (M[i]![j] === "#") {
        break;
      }
      visited[i]![j]!.add(d);
      ranks[i]![j]! = rank;
      const di = dd[d][0];
      const dj = dd[d][1];
      let nd = d;
      if (inMap(i + di, j + dj) && M[i + di]![j + dj] === "#") {
        nd = turnRight(d);
        turned[i]![j] = true;
      }
      visited[i]![j]!.add(nd);
      q.push({ i: i + dd[nd][0], j: j + dd[nd][1], d: nd, rank: rank + 1 });
    }
  }

  bfs();

  console.log("visited:", visited);

  const obss = range(H).map(() => range(W).map(() => false));

  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (turned[i]![j]) {
        for (const d of visited[i]![j]!.values()) {
          if (!visited[i]![j]!.has(turnRight(d))) {
            continue;
          }
          let ni = i - dd[d][0];
          let nj = j - dd[d][1];
          while (inMap(ni, nj)) {
            for (const d2 of visited[ni]![nj]!.values()) {
              if (turnRight(d2) === d && ranks[i]![j]! < ranks[ni]![nj]!) {
                const ni2 = ni + dd[d2][0];
                const nj2 = nj + dd[d2][1];
                if (inMap(ni2, nj2) && M[ni2]![nj2] !== "#") {
                  // if (ni2 === 1 && nj2 === 7) {
                  //   console.log(
                  //     `i: ${i}, j: ${j}, ni: ${ni}, nj: ${nj}, d: ${d}, d2: ${d2}, ni2: ${ni2}, nj2: ${nj2}`,
                  //   );
                  // }
                  obss[ni2]![nj2] = true;
                }
              }
            }
            ni -= dd[d][0];
            nj -= dd[d][1];
          }
        }
      }
    }
  }

  const ss = range(H).map(() => "");

  let res = 0;
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (obss[i]![j]) {
        ss[i]! += "o";
      } else {
        ss[i] += M[i]![j]!;
      }
      res += Number(obss[i]![j]!);
    }
  }

  fs.writeFileSync("06/tmp.txt", ss.join("\n"));

  return res;
}
