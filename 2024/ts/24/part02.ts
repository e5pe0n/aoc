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
  let highestZ = "z00";
  const exps = snd
    .trim()
    .split("\n")
    .map((line) => {
      const m = line.match(RE);
      if (highestZ < m![5]!) {
        highestZ = m![5]!;
      }
      return [m![1], m![2] as Op, m![4], m![5]] as Expr;
    });
  const wrongs = new Set<string>();
  for (const [left, op, right, res] of exps) {
    if (res[0] === "z" && op !== "XOR" && res !== highestZ) {
      wrongs.add(res);
    }
    if (
      op === "XOR" &&
      !["x", "y", "z"].includes(res[0]!) &&
      !["x", "y", "z"].includes(left[0]!) &&
      !["x", "y", "z"].includes(right[0]!)
    ) {
      wrongs.add(res);
    }
    if (op === "AND" && ![left, right].includes("x00")) {
      for (const [subLeft, subOp, subRight, subRes] of exps) {
        if ((res === subLeft || res === subRight) && subOp !== "OR") {
          wrongs.add(res);
        }
      }
    }
    if (op === "XOR") {
      for (const [subLeft, subOp, subRight, subRes] of exps) {
        if ((res === subLeft || res === subRight) && subOp === "OR") {
          wrongs.add(res);
        }
      }
    }
  }
  const res = [...wrongs].sort().join(",");
  return res;
}
