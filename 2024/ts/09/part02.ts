import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const M = fs
    .readFileSync(fp, "utf-8")
    .split("\n")
    .slice(0, -1)
    .map((line) => line.split(""));

  const H = M.length;
  const W = M[0]!.length;
  const antennaMap = new Map<string, [number, number][]>();
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (M[i]![j] !== ".") {
        antennaMap.set(M[i]![j]!, [
          [i, j],
          ...(antennaMap.get(M[i]![j]!) ?? []),
        ]);
      }
    }
  }

  function inMap(i: number, j: number): boolean {
    return 0 <= i && i < H && 0 <= j && j < W;
  }

  const antinodes = range(H).map(() => range(W).map(() => false));

  for (const c of antennaMap.keys()) {
    const coords = antennaMap.get(c)!;
    for (let x = 0; x < coords.length - 1; ++x) {
      for (let y = x + 1; y < coords.length; ++y) {
        const di = coords[y]![0] - coords[x]![0];
        const dj = coords[y]![1] - coords[x]![1];
        for (
          let antinodexi = coords[x]![0] + di, antinodexj = coords[x]![1] + dj;
          inMap(antinodexi, antinodexj);
          antinodexi += di, antinodexj += dj
        ) {
          antinodes[antinodexi]![antinodexj]! = true;
        }
        for (
          let antinodeyi = coords[y]![0] - di, antinodeyj = coords[y]![1] - dj;
          inMap(antinodeyi, antinodeyj);
          antinodeyi -= di, antinodeyj -= dj
        ) {
          antinodes[antinodeyi]![antinodeyj]! = true;
        }
      }
    }
  }
  // for (let i = 0; i < H; ++i) {
  //   for (let j = 0; j < W; ++j) {
  //     if (antinodes[i]![j]) {
  //       M[i]![j] = "#";
  //     }
  //   }
  // }
  // fs.writeFileSync("08/tmp.txt", M.map((line) => line.join("")).join("\n"));
  let res = 0;
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (antinodes[i]![j]) {
        ++res;
      }
    }
  }
  return res;
}
