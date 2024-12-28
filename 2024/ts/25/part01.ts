import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Lock = [number, number, number, number, number];
type Key = [number, number, number, number, number];

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const blocks = fs.readFileSync(fp, "utf-8").trim().split("\n\n");
  const keys: Key[] = [];
  const locks: Lock[] = [];
  for (const block of blocks) {
    const ss = block.split("\n").map((line) => line.split(""));
    if (ss[0]![0] === "#") {
      const lock: Lock = [0, 0, 0, 0, 0];
      for (let j = 0; j < 5; ++j) {
        let h = 0;
        for (let i = 1; i < 6; ++i) {
          if (ss[i]![j] !== "#") {
            break;
          }
          ++h;
        }
        lock[j] = h;
      }
      locks.push(lock);
    } else {
      const key: Key = [0, 0, 0, 0, 0];
      for (let j = 0; j < 5; ++j) {
        let h = 0;
        for (let i = 5; i > 0; --i) {
          if (ss[i]![j] !== "#") {
            break;
          }
          ++h;
        }
        key[j] = h;
      }
      keys.push(key);
    }
  }
  let res = 0;
  for (const lock of locks) {
    for (const key of keys) {
      let fit = true;
      for (let i = 0; i < 5; ++i) {
        if (lock[i]! + key[i]! > 5) {
          fit = false;
          break;
        }
      }
      if (fit) {
        ++res;
      }
    }
  }
  return res;
}
