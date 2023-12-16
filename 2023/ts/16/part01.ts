import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  //   const text = String.raw`.|...\....
  // |.-.\.....
  // .....|-...
  // ........|.
  // ..........
  // .........\
  // ..../.\\..
  // .-.-/..|..
  // .|....-|.\
  // ..//.|....
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const contraption = text
    .trim()
    .split("\n")
    .map((line) => Array.from(line.trim())) as Cell[][];

  type From = {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
  };

  type Coord = [number, number];

  const H = contraption.length;
  const W = contraption[0]!.length;

  const visited: From[][] = range(H).map(() =>
    range(W).map(() => ({
      left: false,
      right: false,
      up: false,
      down: false,
    }))
  );

  type Cell = "." | "/" | "\\" | "|" | "-";
  type Direction = "up" | "down" | "left" | "right";

  type Light = {
    c: Coord;
    d: Direction;
  };

  const didjs: Record<Cell, Record<Direction, Coord[]>> = {
    ".": {
      down: [[1, 0]],
      up: [[-1, 0]],
      left: [[0, -1]],
      right: [[0, 1]],
    },
    "-": {
      down: [
        [0, -1],
        [0, 1],
      ],
      up: [
        [0, -1],
        [0, 1],
      ],
      left: [[0, -1]],
      right: [[0, 1]],
    },
    "|": {
      down: [[1, 0]],
      up: [[-1, 0]],
      left: [
        [-1, 0],
        [1, 0],
      ],
      right: [
        [-1, 0],
        [1, 0],
      ],
    },
    "/": {
      down: [[0, -1]],
      up: [[0, 1]],
      left: [[1, 0]],
      right: [[-1, 0]],
    },
    "\\": {
      down: [[0, 1]],
      up: [[0, -1]],
      left: [[-1, 0]],
      right: [[1, 0]],
    },
  };

  const stk: Light[] = [{ c: [0, 0], d: "right" }];
  visited[0]![0]!.right = true;
  while (stk.length > 0) {
    const {
      c: [i, j],
      d,
    } = stk.pop()!;
    for (const [di, dj] of didjs[contraption[i]![j]!][d]) {
      const ni = i + di;
      const nj = j + dj;
      if (0 <= ni && ni < H && 0 <= nj && nj < W) {
        if (di === -1 && !visited[ni]![nj]!.up) {
          visited[ni]![nj]!.up = true;
          stk.push({ c: [ni, nj], d: "up" });
        }
        if (di === 1 && !visited[ni]![nj]!.down) {
          visited[ni]![nj]!.down = true;
          stk.push({ c: [ni, nj], d: "down" });
        }
        if (dj === -1 && !visited[ni]![nj]!.left) {
          visited[ni]![nj]!.left = true;
          stk.push({ c: [ni, nj], d: "left" });
        }
        if (dj === 1 && !visited[ni]![nj]!.right) {
          visited[ni]![nj]!.right = true;
          stk.push({
            c: [ni, nj],
            d: "right",
          });
        }
      }
    }
  }

  const sum = visited
    .flatMap((v) => v.map((v) => Object.values(v).some((v) => v)))
    .reduce((acc, v) => acc + Number(v), 0);

  console.log(sum); // 7860
}
