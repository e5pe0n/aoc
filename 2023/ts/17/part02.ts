import fs from "fs";
import path from "path";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { range } from "../utils";

{
  // const text = `2413432311323
  // 3215453535623
  // 3255245654254
  // 3446585845452
  // 4546657867536
  // 1438598798454
  // 4457876987766
  // 3637877979653
  // 4654967986887
  // 4564679986453
  // 1224686865563
  // 2546548887735
  // 4322674655533
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const blocks = text
    .trim()
    .split("\n")
    .map((v) => Array.from(v.trim()).map(Number));

  const H = blocks.length;
  const W = blocks[0]!.length;

  const isValidCoord = (i: number, j: number): boolean =>
    0 <= i && i < H && 0 <= j && j < W;

  type Coord = [number, number];

  const didjs = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ] as const;

  const losses: number[][][] = range(H).map(() =>
    range(W).map(() => range(didjs.length).map(() => Number.MAX_SAFE_INTEGER))
  );

  type T = {
    c: Coord;
    d: number;
    loss: number;
  };

  const q = new MinPriorityQueue<T>((v) => v.loss);
  q.enqueue({
    c: [0, 0],
    d: 5,
    loss: 0,
  });
  while (!q.isEmpty()) {
    const {
      c: [i, j],
      d,
      loss,
    } = q.dequeue()!;
    for (const [nd, [di, dj]] of didjs.entries()) {
      if (nd === d || (nd + 2) % 4 === d) {
        continue;
      }
      let sum = 0;
      for (let m = 1; m < 11; ++m) {
        const ni = i + di * m;
        const nj = j + dj * m;
        if (!isValidCoord(ni, nj)) {
          continue;
        }
        sum += blocks[ni]![nj]!;
        if (m < 4) {
          continue;
        }
        const nLoss = loss + sum;
        if (losses[ni]![nj]![nd]! > nLoss) {
          losses[ni]![nj]![nd] = nLoss;
          q.enqueue({
            c: [ni, nj],
            d: nd,
            loss: nLoss,
          });
        }
      }
    }
  }

  console.log(Math.min(...losses[H - 1]![W - 1]!)); // 1135
}
