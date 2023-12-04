import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  //   const text = `467..114..
  // ...*......
  // ..35..633.
  // ......#...
  // 617*......
  // .....+.58.
  // ..592.....
  // ......755.
  // ...$.*....
  // .664.598..
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const schematic = text
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

  const dis = [-1, 0, 1];
  const djs = [-1, 0, 1];

  const didj = dis.flatMap((di, i) => djs.map((dj, j) => [di, dj] as const));

  const H = schematic.length;
  const W = schematic[0]!.length;

  let sum = 0;
  for (const [i, line] of schematic.entries()) {
    for (const [j, s] of line.entries()) {
      if (s !== "*") {
        continue;
      }

      const visited = range(3).map(() =>
        range(schematic[0]!.length).map(() => false)
      );

      let cnt = 0;
      let ratio = 1;
      for (const [di, dj] of didj) {
        const ni = i + di;
        const nj = j + dj;
        const vi = di + 1;
        if (!(0 <= ni && ni < H && 0 <= nj && nj < W)) {
          continue;
        }
        if (!schematic[ni]![nj]!.match(/\d/) || visited[vi]![nj]) {
          continue;
        }

        visited[vi]![nj]! = true;
        ++cnt;
        if (cnt > 2) {
          ratio = 0;
          break;
        }

        let _j = nj - 1;
        while (0 <= _j && schematic[ni]![_j]!.match(/\d/)) {
          visited[vi]![_j] = true;
          --_j;
        }
        const lj = _j + 1;

        _j = nj + 1;
        while (_j < W && schematic[ni]![_j]!.match(/\d/)) {
          visited[vi]![_j] = true;
          ++_j;
        }
        const rj = _j;

        const n = Number(schematic[ni]!.slice(lj, rj).join(""));
        ratio *= n;
      }

      if (cnt === 2) {
        sum += ratio;
      }
    }
  }

  console.log(sum); // 80703636
}
