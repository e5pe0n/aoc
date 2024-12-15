import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Robot = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const RE = /p=(\d+),(\d+)\s*v=(-?\d+),(-?\d+)/;

export function solve(filename: string, X: number, Y: number): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const robots = content.split("\n").map((line) => {
    const m = line.match(RE)!;
    return {
      x: Number(m[1]),
      y: Number(m[2]),
      dx: Number(m[3]),
      dy: Number(m[4]),
    } satisfies Robot;
  });
  const M = range(Y).map(() => range(X).map(() => 0));

  for (const robot of robots) {
    const { x, y, dx, dy } = robot;
    let nx = (x + dx * 100) % X;
    let ny = (y + dy * 100) % Y;
    if (nx < 0) {
      nx += X;
    }
    if (ny < 0) {
      ny += Y;
    }
    M[ny]![nx]! += 1;
  }
  // fs.writeFileSync(
  //   "14/tmp.txt",
  //   M.map((row) => row.map(String).join("")).join("\n"),
  // );
  const q = [
    [0, 0],
    [0, 0],
  ];
  const hY = Math.floor(Y / 2);
  const hX = Math.floor(X / 2);
  for (let y = 0; y < Y; ++y) {
    for (let x = 0; x < X; ++x) {
      if (x < hX && y < hY) {
        q[0]![0]! += M[y]![x]!;
      }
      if (x > hX && y < hY) {
        q[0]![1]! += M[y]![x]!;
      }
      if (x < hX && y > hY) {
        q[1]![0]! += M[y]![x]!;
      }
      if (x > hX && y > hY) {
        q[1]![1]! += M[y]![x]!;
      }
    }
  }
  let res = 1;
  for (let i = 0; i < 2; ++i) {
    for (let j = 0; j < 2; ++j) {
      res *= q[i]![j]!;
    }
  }
  return res;
}
