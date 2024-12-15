import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const didjs = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
} as const;

type Dir = keyof typeof didjs;

type Stk = [[number, number], [number, number]][];

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const [s1, s2] = content.split("\n\n") as [string, string];
  const M = s1
    .trim()
    .split("\n")
    .map((line) =>
      line.split("").flatMap((s) => {
        switch (s) {
          case "#":
            return ["#", "#"];
          case ".":
            return [".", "."];
          case "O":
            return ["[", "]"];
          case "@":
            return ["@", "."];
          default:
            throw new Error("Invalid char");
        }
      }),
    );
  const D = s2
    .trim()
    .split("\n")
    .flatMap((line) => line.split("")) as Dir[];
  const H = M.length;
  const W = M[0]!.length;

  function findStart(): [number, number] {
    for (let i = 0; i < H; ++i) {
      for (let j = 0; j < W; ++j) {
        if (M[i]![j] === "@") {
          M[i]![j] = ".";
          return [i, j];
        }
      }
    }
    throw new Error("No start found");
  }

  function inMap(i: number, j: number): boolean {
    return i >= 0 && i < H && j >= 0 && j < W;
  }

  function bfs(i: number, [lj, rj]: [number, number], di: number, stk: Stk) {
    const q: [number, [number, number]][] = [[i, [lj, rj]]];
    while (q.length > 0) {
      const [ii, [ljj, rjj]] = q.shift()!;
      if (M[ii]![ljj] === "#" || M[ii]![rjj] === "#") {
        stk.length = 0;
        return;
      }
      if (M[ii]![ljj] === "]") {
        stk.push([
          [ii, ljj - 1],
          [ii, ljj],
        ]);
        q.push([ii + di, [ljj - 1, ljj]]);
      }
      if (M[ii]![ljj] === "[") {
        stk.push([
          [ii, ljj],
          [ii, ljj + 1],
        ]);
        q.push([ii + di, [ljj, ljj + 1]]);
      }
      if (M[ii]![rjj] === "[") {
        stk.push([
          [ii, rjj],
          [ii, rjj + 1],
        ]);
        q.push([ii + di, [rjj, rjj + 1]]);
      }
    }
    return;
  }

  let [i, j] = findStart();
  for (const d of D) {
    const stk: [[number, number], [number, number]][] = [];
    const [di, dj] = didjs[d];
    const ni = i + di;
    const nj = j + dj;
    if (M[ni]![nj] === "#") {
      continue;
    }
    if (M[ni]![nj] === ".") {
      i = ni;
      j = nj;
      continue;
    }
    let nii = ni;
    let njj = nj;
    switch (d) {
      case "^":
      case "v":
        {
          if (M[nii]![njj] === "[") {
            stk.push([
              [nii, njj],
              [nii, njj + 1],
            ]);
            bfs(nii + di, [njj, njj + 1], di, stk);
          } else {
            stk.push([
              [nii, njj - 1],
              [nii, njj],
            ]);
            bfs(nii + di, [njj - 1, njj], di, stk);
          }
          if (stk.length === 0) {
            continue;
          }
          while (stk.length > 0) {
            const [[li, lj], [ri, rj]] = stk.pop()!;
            M[li + di]![lj] = "[";
            M[ri + di]![rj] = "]";
            M[li]![lj] = ".";
            M[ri]![rj] = ".";
          }
          i = ni;
          j = nj;
        }
        break;
      case "<":
      case ">":
        {
          while (["[", "]"].includes(M[nii]![njj]!)) {
            if (M[nii]![njj] === "[") {
              stk.push([
                [nii, njj],
                [nii, njj + 1],
              ]);
            } else {
              stk.push([
                [nii, njj - 1],
                [nii, njj],
              ]);
            }
            nii += di * 2;
            njj += dj * 2;
          }
          if (M[nii]![njj] === "#") {
            continue;
          }
          while (stk.length > 0) {
            const [[li, lj], [ri, rj]] = stk.pop()!;
            M[li + di]![lj + dj] = "[";
            M[ri + di]![rj + dj] = "]";
          }
          M[ni]![nj] = ".";
          i = ni;
          j = nj;
        }
        break;
    }
  }
  let res = 0;
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (M[i]![j] === "[") {
        res += i * 100 + j;
      }
    }
  }
  return res;
}
