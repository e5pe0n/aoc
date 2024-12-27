import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RE = /(\w+)\s+((AND|XOR|OR))\s+(\w+)\s+->\s+(\w+)/;
type Op = "AND" | "XOR" | "OR";
type Expr = [string, Op, string, string];

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const [fst, snd] = fs.readFileSync(fp, "utf-8").trim().split("\n\n") as [
    string,
    string,
  ];
  const M = new Map<string, number>();
  for (const line of fst.trim().split("\n")) {
    const [k, v] = line.split(/:\s+/) as [string, string];
    M.set(k, Number(v));
  }
  const exps = snd
    .trim()
    .split("\n")
    .map((line) => {
      const m = line.match(RE);
      return [m![1], m![2] as Op, m![4], m![5]] as Expr;
    });
  const q = exps;
  while (q.length > 0) {
    const [left, op, right, res] = q.shift()!;
    if (!M.has(left) || !M.has(right)) {
      q.push([left, op, right, res]);
      continue;
    }
    let v: number;
    switch (op) {
      case "AND":
        v = M.get(left)! & M.get(right)!;
        break;
      case "OR":
        v = M.get(left)! | M.get(right)!;
        break;
      case "XOR":
        v = M.get(left)! ^ M.get(right)!;
        break;
    }
    M.set(res, v);
  }
  const zs = Array.from(M.entries())
    .filter(([k]) => k.startsWith("z"))
    .sort();
  let output = 0;
  for (let i = 0; i < zs.length; ++i) {
    if (zs[i]![1]) {
      output += 2 ** i;
    }
  }
  return output;
}
