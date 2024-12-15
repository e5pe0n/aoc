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

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const [s1, s2] = content.split("\n\n") as [string, string];
  const M = s1
    .trim()
    .split("\n")
    .map((line) => line.split(""));
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

  let [i, j] = findStart();
  for (const d of D) {
    const stk: [number, number][] = [];
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
    while (M[nii]![njj] === "O") {
      stk.push([nii, njj]);
      nii += di;
      njj += dj;
    }
    if (M[nii]![njj] === "#") {
      continue;
    }
    while (stk.length > 0) {
      const [nii, njj] = stk.pop()!;
      M[nii + di]![njj + dj] = "O";
    }
    M[ni]![nj] = ".";
    i = ni;
    j = nj;
  }
  let res = 0;
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (M[i]![j] === "O") {
        res += i * 100 + j;
      }
    }
  }
  return res;
}
