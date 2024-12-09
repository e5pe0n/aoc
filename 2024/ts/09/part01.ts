import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const memory = content.split("").map(Number);
  let left = 0;
  let right = memory.length % 2 === 0 ? memory.length - 2 : memory.length - 1;
  let res = 0;
  let i = 0;
  while (left <= right) {
    for (let j = i; j < i + memory[left]!; ++j) {
      res += j * Math.floor(left / 2);
    }
    i += memory[left]!;
    memory[left] = 0;
    ++left;
    while (left < right && memory[left]! > 0) {
      if (memory[left]! >= memory[right]!) {
        for (let j = i; j < i + memory[right]!; ++j) {
          res += j * Math.floor(right / 2);
        }
        i += memory[right]!;
        memory[left]! = memory[left]! - memory[right]!;
        memory[right] = 0;
        right -= 2;
      } else {
        for (let j = i; j < i + memory[left]!; ++j) {
          res += j * Math.floor(right / 2);
        }
        i += memory[left]!;
        memory[right]! = memory[right]! - memory[left]!;
        memory[left]! = 0;
      }
    }
    ++left;
  }
  return res;
}
