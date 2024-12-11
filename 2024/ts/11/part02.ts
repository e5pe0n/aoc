import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string, N: number): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const stones = content.split(/\s+/).map(Number);

  const MM = range(N).map(() => new Map<number, number>());

  function dfs(stone: number, i: number): number {
    if (i === N) {
      return 1;
    }

    if (MM[i]!.has(stone)) {
      return MM[i]!.get(stone)!;
    }

    if (stone === 0) {
      return dfs(1, i + 1);
    }

    const stoneStr = String(stone);
    if (stoneStr.length % 2 === 0) {
      const res =
        dfs(Number(stoneStr.substring(0, stoneStr.length / 2)), i + 1) +
        dfs(Number(stoneStr.substring(stoneStr.length / 2)), i + 1);
      MM[i]!.set(stone, res);
      return res;
    }

    const res = dfs(stone * 2024, i + 1);
    MM[i]!.set(stone, res);
    return res;
  }

  let res = 0;
  for (const stone of stones) {
    res += dfs(stone, 0);
  }
  return res;
}
