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

export function solve(filename: string, X: number, Y: number): void {
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

  for (let i = 0; i < 10_000; ++i) {
    const M = range(Y).map(() => range(X).map(() => "."));
    for (const robot of robots) {
      const { x, y, dx, dy } = robot;
      let nx = (x + dx * i) % X;
      let ny = (y + dy * i) % Y;
      if (nx < 0) {
        nx += X;
      }
      if (ny < 0) {
        ny += Y;
      }
      M[ny]![nx]! = "#";
    }
    fs.writeFileSync(
      `14/tmp${i}.txt`,
      M.map((row) => row.map(String).join("")).join("\n"),
    );
  }
}
