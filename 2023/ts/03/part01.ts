import fs from "fs";
import path from "path";

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

  const visited = Array.from(schematic, (line) => line.map(() => false));

  const dis = [-1, 0, 1];
  const djs = [-1, 0, 1];

  const H = schematic.length;
  const W = schematic[0]!.length;

  let sum = 0;
  for (const [i, line] of schematic.entries()) {
    for (const [j, s] of line.entries()) {
      if (s.match(/[\.\d]/)) {
        continue;
      }
      for (const di of dis) {
        for (const dj of djs) {
          const ni = i + di;
          const nj = j + dj;
          if (!(0 <= ni && ni < H && 0 <= nj && nj < W)) {
            continue;
          }
          if (!schematic[ni]![nj]!.match(/\d/) || visited[ni]![nj]) {
            continue;
          }

          visited[ni]![nj]! = true;

          let _j = nj - 1;
          while (0 <= _j && schematic[ni]![_j]!.match(/\d/)) {
            visited[ni]![_j] = true;
            --_j;
          }
          const lj = _j + 1;

          _j = nj + 1;
          while (_j < W && schematic[ni]![_j]!.match(/\d/)) {
            visited[ni]![_j] = true;
            ++_j;
          }
          const rj = _j;

          const n = Number(schematic[ni]!.slice(lj, rj).join(""));
          sum += n;
        }
      }
    }
  }

  console.log(sum); // 539590
}
