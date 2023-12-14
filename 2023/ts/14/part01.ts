import fs from "fs";
import path from "path";

{
  //   const text = `O....#....
  // O.OO#....#
  // .....##...
  // OO.#O....O
  // .O.....O#.
  // O.#..O.#.#
  // ..O..#O..O
  // .......O..
  // #....###..
  // #OO..#....
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const platform = text
    .trim()
    .split("\n")
    .map((line) => Array.from(line.trim()));

  const H = platform[0]!.length;
  const W = platform.length;

  let sum = 0;
  for (let j = 0; j < W; ++j) {
    let max = H;
    for (let i = 0; i < H; ++i) {
      if (platform[i]![j] === "O") {
        sum += max;
        --max;
      } else if (platform[i]![j] === "#") {
        max = H - (i + 1);
      }
    }
  }

  console.log(sum); // 107142
}
