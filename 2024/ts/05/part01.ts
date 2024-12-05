import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Rule = {
  left: number;
  right: number;
};

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const [ruleLines, updateLines] = fs
    .readFileSync(fp, "utf-8")
    .split("\n\n") as [string, string];
  const rules: Rule[] = ruleLines
    .split("\n")
    .map((line) =>
      line
        .trim()
        .split("|")
        .map((v) => Number(v)),
    )
    .map(([left, right]) => ({ left: left!, right: right! }));
  const updates: number[][] = updateLines
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(",").map(Number));

  const ruleMap = new Map<number, Set<number>>();
  for (const rule of rules) {
    ruleMap.set(
      rule.left,
      (ruleMap.get(rule.left) ?? new Set()).add(rule.right),
    );
  }

  let sum = 0;
  for (const update of updates) {
    let safe = true;
    for (const [i, u] of update.slice(0, -1).entries()) {
      for (const v of update.slice(i + 1)) {
        if (!ruleMap.get(u)?.has(v)) {
          safe = false;
          break;
        }
      }
      if (!safe) {
        break;
      }
    }
    if (safe) {
      sum += update[Math.floor(update.length / 2)]!;
    }
  }
  return sum;
}
