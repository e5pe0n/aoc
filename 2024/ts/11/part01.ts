import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const stones = content.split(/\s+/).map(Number);
  let nextStones: number[] = [...stones];
  for (let i = 0; i < 25; ++i) {
    const currStones = [...nextStones];
    nextStones = [];
    for (const stone of currStones) {
      if (stone === 0) {
        nextStones.push(1);
        continue;
      }
      const stoneStr = String(stone);
      if (stoneStr.length % 2 === 0) {
        nextStones.push(Number(stoneStr.substring(0, stoneStr.length / 2)));
        nextStones.push(Number(stoneStr.substring(stoneStr.length / 2)));
        continue;
      }
      nextStones.push(stone * 2024);
    }
  }
  return nextStones.length;
}
