import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
  const P = lines[0]!.split(/,\s*/);
  const T = lines.slice(2);

  function dfs(t: string, begin: number, PP: string[]): boolean {
    if (begin === t.length) {
      return true;
    }
    for (const p of PP) {
      const s = t.substring(begin, begin + p.length);
      if (s === p && dfs(t, begin + p.length, PP)) {
        return true;
      }
    }
    return false;
  }

  let res = 0;
  for (const t of T) {
    const PP = P.filter((p) => t.includes(p));
    const ok = dfs(t, 0, PP);
    if (ok) {
      ++res;
    }
  }

  return res;
}
