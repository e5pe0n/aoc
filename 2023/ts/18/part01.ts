import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  // const text = `R 6 (#70c710)
  // D 5 (#0dc571)
  // L 2 (#5713f0)
  // D 2 (#d2c081)
  // R 2 (#59c680)
  // D 2 (#411b91)
  // L 5 (#8ceee2)
  // U 2 (#caa173)
  // L 1 (#1b58a2)
  // U 2 (#caa171)
  // R 2 (#7807d2)
  // U 3 (#a77fa3)
  // L 2 (#015232)
  // U 2 (#7a21e3)
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  type Coord = [number, number];

  type Direction = "U" | "D" | "L" | "R";

  const didjs: Record<Direction, Coord> = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1],
  };

  type Plan = {
    d: Direction;
    n: number;
    rgb: string;
  };

  const plans = text
    .trim()
    .split("\n")
    .map((line) => {
      const [d, n, rgb] = line.trim().split(/\s+/) as [string, string, string];
      return {
        d: d as Plan["d"],
        n: Number(n),
        rgb: rgb,
      } satisfies Plan;
    });

  let [mini, maxi, minj, maxj] = [0, 0, 0, 0];
  let [i, j] = [0, 0];
  for (const plan of plans) {
    const [di, dj] = didjs[plan.d];
    i += di * plan.n;
    j += dj * plan.n;
    mini = Math.min(mini, i);
    maxi = Math.max(maxi, i);
    minj = Math.min(minj, j);
    maxj = Math.max(maxj, j);
  }

  const H = maxi - mini + 1;
  const W = maxj - minj + 1;
  const lagoon = range(H).map(() => range(W).map(() => false));
  i = 0 - mini;
  j = 0 - minj;
  for (const plan of plans) {
    const [di, dj] = didjs[plan.d];
    for (let k = 1; k <= plan.n; ++k) {
      lagoon[i + di * k]![j] = true;
    }
    for (let k = 1; k <= plan.n; ++k) {
      lagoon[i]![j + dj * k] = true;
    }
    i += di * plan.n;
    j += dj * plan.n;
  }

  for (let i = 1; i < H; ++i) {
    let j = 0;
    while (j < W) {
      while (
        j < W &&
        !(
          !lagoon[i]![j] &&
          lagoon[i]![j - 1] &&
          lagoon[i - 1]![j - 1] &&
          lagoon[i - 1]![j]
        )
      ) {
        ++j;
      }
      while (j < W && !lagoon[i]![j]) {
        lagoon[i]![j] = true;
        ++j;
      }
      j += 2;
    }
  }

  let sum = 0;
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      sum += Number(lagoon[i]![j]!);
    }
  }
  console.log(sum); // 39039
}
