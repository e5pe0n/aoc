import fs from "fs";
import path from "path";

{
  // const text = `#.##..##.
  // ..#.##.#.
  // ##......#
  // ##......#
  // ..#.##.#.
  // ..##..##.
  // #.#.##.#.

  // #...##..#
  // #....#..#
  // ..##..###
  // #####.##.
  // #####.##.
  // ..##..###
  // #....#..#
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const patterns = text
    .trim()
    .split("\n\n")
    .map((v) =>
      v
        .trim()
        .split("\n")
        .map((v) => Array.from(v.trim()))
    );

  const runRow = (pattern: string[][]): number => {
    for (let i = 0; i < pattern.length - 1; ++i) {
      let diff = 0;
      for (let j = 0; j < pattern[0]!.length; ++j) {
        if (pattern[i]![j] !== pattern[i + 1]![j]) {
          if (++diff > 1) {
            break;
          }
        }
      }
      if (diff > 1) {
        continue;
      }
      for (let d = 1; i - d >= 0 && i + 1 + d < pattern.length; ++d) {
        for (let j = 0; j < pattern[0]!.length; ++j) {
          if (pattern[i - d]![j] !== pattern[i + 1 + d]![j]) {
            if (++diff > 1) {
              break;
            }
          }
        }
        if (diff > 1) {
          break;
        }
      }
      if (diff === 1) {
        return (i + 1) * 100;
      }
    }
    return 0;
  };

  const runCol = (pattern: string[][]): number => {
    for (let j = 0; j < pattern[0]!.length - 1; ++j) {
      let diff = 0;
      for (let i = 0; i < pattern.length; ++i) {
        if (pattern[i]![j] !== pattern[i]![j + 1]) {
          if (++diff > 1) {
            break;
          }
        }
      }
      if (diff > 1) {
        continue;
      }
      for (let d = 1; j - d >= 0 && j + 1 + d < pattern[0]!.length; ++d) {
        for (let i = 0; i < pattern.length; ++i) {
          if (pattern[i]![j - d] !== pattern[i]![j + 1 + d]) {
            if (++diff > 1) {
              break;
            }
          }
        }
        if (diff > 1) {
          break;
        }
      }
      if (diff === 1) {
        return j + 1;
      }
    }
    return 0;
  };

  const sum = patterns
    .slice(0)
    .map((pattern) => runRow(pattern) + runCol(pattern))
    .reduce((acc, v) => acc + v, 0);

  console.log(sum);
}
