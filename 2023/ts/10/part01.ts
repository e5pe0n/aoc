import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  //   const text = `-L|F7
  // 7S-7|
  // L|7||
  // -L-J|
  // L|-JF
  // `;

  //   const text = `..F7.
  // .FJ|.
  // SJ.L7
  // |F--J
  // LJ...
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const tiles = text
    .trim()
    .split("\n")
    .map((s) => Array.from(s.trim()));

  const H = tiles.length;
  const W = tiles[0]!.length;

  const visited = range(H).map(() => range(W).map(() => false));

  const findS = (tiles: string[][]): [number, number] => {
    for (const [i, line] of tiles.entries()) {
      for (const [j, s] of line.entries()) {
        if (s === "S") {
          return [i, j];
        }
      }
    }
    throw new Error("S not found.");
  };

  const upPipes = ["|", "7", "F"] as const;
  const downPipes = ["|", "L", "J"] as const;
  const leftPipes = ["-", "F", "L"] as const;
  const rightPipes = ["-", "7", "J"] as const;

  const [si, sj] = findS(tiles);
  visited[si]![sj] = true;

  const snd = ([si, sj]: [number, number]): [number, number] => {
    for (const [di, dj] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ] as const) {
      const ni = si + di;
      const nj = sj + dj;
      if (!(0 <= ni && ni < H && 0 <= nj && nj < W)) {
        continue;
      }
      const tile = tiles[ni]![nj]!;
      if (
        (di === -1 && upPipes.includes(tile as (typeof upPipes)[number])) ||
        (di === 1 && downPipes.includes(tile as (typeof downPipes)[number])) ||
        (dj === 1 &&
          rightPipes.includes(tile as (typeof rightPipes)[number])) ||
        (dj === -1 && leftPipes.includes(tile as (typeof leftPipes)[number]))
      ) {
        return [ni, nj];
      }
    }
    throw new Error("2nd tile not found.");
  };

  const [_i, _j] = snd([si, sj]);

  type Pipe = "|" | "-" | "L" | "J" | "7" | "F";
  const didjs: Record<Pipe, [number, number][]> = {
    "|": [
      [-1, 0],
      [1, 0],
    ],
    "-": [
      [0, -1],
      [0, 1],
    ],
    L: [
      [-1, 0],
      [0, 1],
    ],
    J: [
      [-1, 0],
      [0, -1],
    ],
    "7": [
      [1, 0],
      [0, -1],
    ],
    F: [
      [1, 0],
      [0, 1],
    ],
  };

  let d = 1;
  visited[_i]![_j] = true;
  const stk = [[_i, _j] as const];
  while (stk.length > 0) {
    const [i, j] = stk.pop()!;
    const tile = tiles[i]![j]!;
    for (const [di, dj] of didjs[tile as Pipe]) {
      const ni = i + di;
      const nj = j + dj;
      if (!visited[ni]![nj]) {
        visited[ni]![nj] = true;
        ++d;
        stk.push([ni, nj]);
        break;
      }
    }
  }
  console.log(Math.ceil(d / 2)); // 6942
}
