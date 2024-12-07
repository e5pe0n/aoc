import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Equation = {
  left: number;
  rights: number[];
};

function dfs(eq: Equation, i: number, sum: number): boolean {
  if (i === eq.rights.length) {
    return eq.left === sum;
  }
  return (
    dfs(eq, i + 1, sum + eq.rights[i]!) || dfs(eq, i + 1, sum * eq.rights[i]!)
  );
}

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const eqs: Equation[] = fs
    .readFileSync(fp, "utf-8")
    .split("\n")
    .slice(0, -1)
    .map((line) => {
      const [left, rest] = line.split(/:\s*/) as [string, string];
      return {
        left: Number(left),
        rights: rest.split(/\s+/).map(Number),
      } satisfies Equation;
    });
  let res = 0;
  for (const eq of eqs) {
    if (dfs(eq, 1, eq.rights[0]!)) {
      res += eq.left;
    }
  }
  return res;
}
