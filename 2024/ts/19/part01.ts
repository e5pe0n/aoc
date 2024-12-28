import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
  const towels = lines[0]!.split(/,\s*/);
  const designs = lines.slice(2);

  function f(design: string): number {
    const dp = range(design.length + 1).map(() => 0);
    dp[0] = 1;
    for (let i = 0; i <= design.length; ++i) {
      if (dp[i] === 0) {
        continue;
      }
      for (const towel of towels) {
        if (
          i + towel.length <= design.length &&
          design.substring(i, i + towel.length) === towel
        ) {
          dp[i + towel.length] = 1;
        }
      }
    }
    return dp[design.length]!;
  }

  let res = 0;
  for (const design of designs) {
    res += f(design);
  }

  return res;
}
