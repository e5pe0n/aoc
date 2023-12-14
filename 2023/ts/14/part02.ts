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

  const H = platform.length;
  const W = platform[0]!.length;

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
  for (let i = 0; i < 1000; ++i) {
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

  let start = -1;
  let len = -1;
  for (let i = 0; i < ps.length - 1; ++i) {
    for (let j = i + 1; j < ps.length; ++j) {
      if (eq(ps[i]!, ps[j]!)) {
        start = i;
        len = j - i;
        break;
      }
    }
    if (start >= 0) {
      break;
    }
  }
  const mod = (1_000_000_000 - start) % len;
  console.log(calcLoad(ps[start + mod]!)); // 104815
}
