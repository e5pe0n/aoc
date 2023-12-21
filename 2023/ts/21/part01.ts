import fs from "fs";
import path from "path";
import { Queue } from "@datastructures-js/queue";

{
  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  type Coord = [number, number];

  const garden = text
    .trim()
    .split("\n")
    .map((line) => Array.from(line.trim()));

  const H = garden.length;
  const W = garden[0]!.length;

  const didjs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ] as const;

  const _in = (c: Coord): boolean =>
    0 <= c[0] && c[0] < H && 0 <= c[1] && c[1] < W;

  let s: Coord = [-1, -1];
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (garden[i]![j] === "S") {
        s = [i, j];
        garden[i]![j] = ".";
        break;
      }
    }
    if (s[0] !== -1) {
      break;
    }
  }

  const visited = garden.map((line) => line.map(() => false));
  let cnt = 0;
  const q = new Queue<{ c: Coord; step: number }>([{ c: s, step: 0 }]);
  while (!q.isEmpty()) {
    const {
      c: [i, j],
      step,
    } = q.dequeue();
    for (const [di, dj] of didjs) {
      const ni = i + di;
      const nj = j + dj;
      if (
        _in([ni, nj]) &&
        !visited[ni]![nj] &&
        garden[ni]![nj] === "." &&
        step < 64
      ) {
        visited[ni]![nj] = true;
        const nstep = step + 1;
        if (nstep % 2 === 0) {
          ++cnt;
        }
        q.enqueue({ c: [ni, nj], step: nstep });
      }
    }
  }
  console.log(cnt);
}
