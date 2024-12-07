import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

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

  let res = 0;
  // for (const update of updates.slice(0, 1)) {
  for (const update of updates) {
    const sortedUpdate = [...update].sort((a, b) => {
      if (ruleMap.get(a)?.has(b)) {
        return -1;
      }
      if (ruleMap.get(b)?.has(a)) {
        return 1;
      }
      return 0;
    });
    // console.log("update:", update);
    // console.log("sortedUpdate:", sortedUpdate);
    let alreadySorted = true;
    for (let i = 0; i < update.length; ++i) {
      if (sortedUpdate[i] !== update[i]) {
        alreadySorted = false;
        break;
      }
    }
    if (!alreadySorted) {
      res += sortedUpdate[Math.floor(update.length / 2)]!;
    }
  }
  return res;
}
