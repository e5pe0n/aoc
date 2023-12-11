import fs from "fs";
import path from "path";

{
  // const text = `...#......
  // .......#..
  // #.........
  // ..........
  // ......#...
  // .#........
  // .........#
  // ..........
  // .......#..
  // #...#.....
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const image = text
    .trim()
    .split("\n")
    .map((s) => Array.from(s.trim()));

  const twiceis = new Set<number>();
  for (const [i, line] of image.entries()) {
    if (line.every((s) => s === ".")) {
      twiceis.add(i);
    }
  }

  const twicejs = new Set<number>();
  for (let j = 0; j < image[0]!.length; ++j) {
    let empty = true;
    for (let i = 0; i < image.length; ++i) {
      if (image[i]![j] === "#") {
        empty = false;
        break;
      }
    }
    if (empty) {
      twicejs.add(j);
    }
  }

  const garaxies: [number, number][] = [];
  for (const [i, line] of image.entries()) {
    for (const [j, s] of line.entries()) {
      if (s === "#") {
        garaxies.push([i, j]);
      }
    }
  }

  let prevSum = 0;
  let sum = 0;
  for (let i = 0; i < garaxies.length; ++i) {
    for (let j = i + 1; j < garaxies.length; ++j) {
      const g1 = garaxies[i]!;
      const g2 = garaxies[j]!;
      let d = Math.abs(g1[0] - g2[0]) + Math.abs(g1[1] - g2[1]);
      for (let _i = Math.min(g1[0], g2[0]); _i < Math.max(g1[0], g2[0]); ++_i) {
        if (twiceis.has(_i)) {
          d += 1000000 - 1;
        }
      }
      for (let _j = Math.min(g1[1], g2[1]); _j < Math.max(g1[1], g2[1]); ++_j) {
        if (twicejs.has(_j)) {
          d += 1000000 - 1;
        }
      }
      prevSum = sum;
      sum += d;
      if (prevSum > sum) {
        throw new Error(`overflow: ${prevSum}`);
      }
    }
  }

  console.log(sum); // 483844716556
}
