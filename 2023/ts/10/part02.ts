// TODO: Should refactor
import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  //   const text = `...........
  // .S-------7.
  // .|F-----7|.
  // .||.....||.
  // .||.....||.
  // .|L-7.F-J|.
  // .|..|.|..|.
  // .L--J.L--J.
  // ...........
  // `;

  //   const text = `..........
  // .S------7.
  // .|F----7|.
  // .||OOOO||.
  // .||OOOO||.
  // .|L-7F-J|.
  // .|II||II|.
  // .L--JL--J.
  // ..........
  // `;

  //   const text = `.F----7F7F7F7F-7....
  // .|F--7||||||||FJ....
  // .||.FJ||||||||L7....
  // FJL7L7LJLJ||LJ.L-7..
  // L--J.L7...LJS7F-7L7.
  // ....F-J..F7FJ|L7L7L7
  // ....L7.F7||L7|.L7L7|
  // .....|FJLJ|FJ|F7|.LJ
  // ....FJL-7.||.||||...
  // ....L---J.LJ.LJLJ...
  // `;

  //   const text = `FF7FSF7F7F7F7F7F---7
  // L|LJ||||||||||||F--J
  // FL-7LJLJ||||||LJL-77
  // F--JF--7||LJLJ7F7FJ-
  // L---JF-JLJ.||-FJLJJ7
  // |F|F-JF---7F7-L7L|7|
  // |FFJF7L7F-JF7|JL---7
  // 7-L-JL7||F7|L7F-7F7|
  // L.L7LFJ|||||FJL7||LJ
  // L7JLJL-JLJLJL--JLJ.L
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

  const eqArr = <T, U>(xs: T[], ys: U[]): boolean => {
    if (xs.length !== ys.length) {
      return false;
    }
    for (let i = 0; i < xs.length; ++i) {
      if (xs[i] !== ys[i]) {
        return false;
      }
    }

    return true;
  };

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

  const getSNexts = ([si, sj]: [number, number]): [number, number][] => {
    const res: [number, number][] = [];
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
      if (di === -1 && upPipes.includes(tile as (typeof upPipes)[number])) {
        res.push([-1, 0]);
      } else if (
        di === 1 &&
        downPipes.includes(tile as (typeof downPipes)[number])
      ) {
        res.push([1, 0]);
      } else if (
        dj === 1 &&
        rightPipes.includes(tile as (typeof rightPipes)[number])
      ) {
        res.push([0, 1]);
      } else if (
        dj === -1 &&
        leftPipes.includes(tile as (typeof leftPipes)[number])
      ) {
        res.push([0, -1]);
      }
    }
    return res;
  };

  const sNexts = getSNexts([si, sj]);

  type PipeType = "|" | "-" | "L" | "J" | "7" | "F";
  type Next = {
    next: [number, number];
    lefts: [number, number][];
    rights: [number, number][];
  };
  type Pipe = {
    nexts: Next[];
  };
  const pipeRecord: Record<PipeType, Pipe> = {
    "|": {
      nexts: [
        {
          next: [-1, 0],
          lefts: [[0, -1]],
          rights: [[0, 1]],
        },
        {
          next: [1, 0],
          lefts: [[0, 1]],
          rights: [[0, -1]],
        },
      ],
    },
    "-": {
      nexts: [
        {
          next: [0, -1],
          lefts: [[1, 0]],
          rights: [[-1, 0]],
        },
        {
          next: [0, 1],
          lefts: [[-1, 0]],
          rights: [[1, 0]],
        },
      ],
    },
    L: {
      nexts: [
        {
          next: [-1, 0],
          lefts: [
            [1, 0],
            [0, -1],
          ],
          rights: [],
        },
        {
          next: [0, 1],
          lefts: [],
          rights: [
            [1, 0],
            [0, -1],
          ],
        },
      ],
    },
    J: {
      nexts: [
        {
          next: [-1, 0],
          lefts: [],
          rights: [
            [1, 0],
            [0, 1],
          ],
        },
        {
          next: [0, -1],
          lefts: [
            [1, 0],
            [0, 1],
          ],
          rights: [],
        },
      ],
    },
    "7": {
      nexts: [
        {
          next: [1, 0],
          lefts: [
            [-1, 0],
            [0, 1],
          ],
          rights: [],
        },
        {
          next: [0, -1],
          lefts: [],
          rights: [
            [-1, 0],
            [0, 1],
          ],
        },
      ],
    },
    F: {
      nexts: [
        {
          next: [1, 0],
          lefts: [],
          rights: [
            [-1, 0],
            [0, -1],
          ],
        },
        {
          next: [0, 1],
          lefts: [
            [-1, 0],
            [0, -1],
          ],
          rights: [],
        },
      ],
    },
  };

  const pipes: (Pipe | null)[][] = range(H).map(() => range(W).map(() => null));
  tiles[si]![sj] = Object.entries(pipeRecord).filter(
    ([pipeType, pipe]) =>
      (eqArr(pipe.nexts[0]!.next, sNexts[0]!) &&
        eqArr(pipe.nexts[1]!.next, sNexts[1]!)) ||
      (eqArr(pipe.nexts[0]!.next, sNexts[1]!) &&
        eqArr(pipe.nexts[1]!.next, sNexts[0]!))
  )[0]![0]!;

  let [left, right] = [0, 0];
  let stk = [[si, sj] as const];
  while (stk.length > 0) {
    const [i, j] = stk.pop()!;
    const tile = tiles[i]![j]!;
    const pipe = pipeRecord[tile as PipeType];
    pipes[i]![j] = pipe;
    for (const next of pipe.nexts) {
      const ni = i + next.next[0];
      const nj = j + next.next[1];
      if (!pipes[ni]![nj]) {
        left += next.lefts.length;
        right += next.rights.length;
        stk.push([ni, nj]);
        break;
      }
    }
  }

  let cnt = 0;

  const cntInner = ([si, sj]: [number, number]) => {
    const stk = [[si, sj] as const];
    while (stk.length > 0) {
      const [i, j] = stk.pop()!;
      if (
        0 <= i &&
        i < H &&
        0 <= j &&
        j < W &&
        !visited[i]![j] &&
        !pipes[i]![j]
      ) {
        ++cnt;
        visited[i]![j] = true;
        for (const [di, dj] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ] as const) {
          const ni = i + di;
          const nj = j + dj;
          stk.push([ni, nj]);
        }
      }
    }
  };

  stk = [[si, sj] as const];
  while (stk.length > 0) {
    const [i, j] = stk.pop()!;
    const pipe = pipes[i]![j]!;
    visited[i]![j] = true;
    for (const next of pipe.nexts) {
      const ni = i + next.next[0];
      const nj = j + next.next[1];
      if (!visited[ni]![nj]) {
        const inners = left > right ? next.rights : next.lefts;
        for (const inner of inners) {
          cntInner([i + inner[0], j + inner[1]]);
        }
        stk.push([ni, nj]);
        break;
      }
    }
  }

  console.log(cnt); // 297
}
