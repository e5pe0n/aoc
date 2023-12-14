import fs from "fs";
import path from "path";

{
  const text = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;

  const platform = text
    .trim()
    .split("\n")
    .map((line) => Array.from(line.trim()));

  const squares: [number, number][] = [];
  for (const [i, line] of platform.entries()) {
    for (const [j, rock] of line.entries()) {
      if (rock === "#") {
        squares.push([i, j]);
      }
    }
  }

  const H = platform.length;
  const W = platform[0]!.length;

  const print = (platform: string[][]) => {
    console.log(platform.map((line) => line.join("")).join("\n"));
  };

  const calcLoad = (p: string[][]): number => {
    let sum = 0;
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[0]!.length; ++j) {
        if (p[i]![j] === "O") {
          sum += H - i;
        }
      }
    }
    return sum;
  };

  const wp = (...platforms: string[][][]) => {
    const data = platforms
      .map(
        (platform, i) =>
          `${i} ${calcLoad(platform)}\n` +
          platform.map((line) => line.join("")).join("\n")
      )
      .join("\n\n");
    fs.writeFileSync(path.join(__dirname, "./tmp02.txt"), data);
  };

  const tiltN = (p: string[][]): string[][] => {
    const np = [...p.map((line) => [...line])];
    for (let j = 0; j < W; ++j) {
      let ni = 0;
      for (let i = 0; i < H; ++i) {
        if (p[i]![j] === "O") {
          np[ni]![j] = "O";
          if (i !== ni) {
            np[i]![j] = ".";
          }
          ++ni;
        } else if (p[i]![j] === "#") {
          ni = i + 1;
        }
      }
    }
    return np;
  };

  const tiltE = (p: string[][]): string[][] => {
    const np = [...p.map((line) => [...line])];
    for (let i = 0; i < H; ++i) {
      let nj = W - 1;
      for (let j = W - 1; j >= 0; --j) {
        if (p[i]![j] === "O") {
          np[i]![nj] = "O";
          if (j !== nj) {
            np[i]![j] = ".";
          }
          --nj;
        } else if (p[i]![j] === "#") {
          nj = j - 1;
        }
      }
    }
    return np;
  };

  const tiltS = (p: string[][]): string[][] => {
    const np = [...p.map((line) => [...line])];
    for (let j = 0; j < W; ++j) {
      let ni = H - 1;
      for (let i = H - 1; i >= 0; --i) {
        if (p[i]![j] === "O") {
          np[ni]![j] = "O";
          if (i !== ni) {
            np[i]![j] = ".";
          }
          --ni;
        } else if (np[i]![j] === "#") {
          ni = i - 1;
        }
      }
    }
    return np;
  };

  const tiltW = (p: string[][]): string[][] => {
    const np = [...p.map((line) => [...line])];
    for (let i = 0; i < H; ++i) {
      let nj = 0;
      for (let j = 0; j < W; ++j) {
        if (p[i]![j] === "O") {
          np[i]![nj] = "O";
          if (j !== nj) {
            np[i]![j] = ".";
          }
          ++nj;
        } else if (p[i]![j] === "#") {
          nj = j + 1;
        }
      }
    }
    return np;
  };

  const ps = [platform];
  for (let i = 0; i < 100; ++i) {
    ps.push(tiltE(tiltS(tiltW(tiltN(ps.at(-1)!)))));
  }

  const eq = (p1: string[][], p2: string[][]) => {
    for (let i = 0; i < p1.length; ++i) {
      for (let j = 0; j < p1[0]!.length; ++j) {
        if (p1[i]![j] !== p2[i]![j]) {
          return false;
        }
      }
    }
    return true;
  };

  for (let i = 0; i < ps.length - 1; ++i) {
    for (let j = i + 1; j < ps.length; ++j) {
      if (eq(ps[i]!, ps[j]!)) {
        console.log(i, j);
      }
    }
  }
  wp(...ps);
}
