import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const s = fs.readFileSync(fp, "utf-8");
  const MUL_RE = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const DO_RE = /do\(\)/g;
  const DONT_RE = /don't\(\)/g;
  const muls = s.matchAll(MUL_RE);
  const dos = s.matchAll(DO_RE);
  const donts = s.matchAll(DONT_RE);

  const ms: RegExpExecArray[] = [];
  for (const m of muls) {
    ms.push(m);
  }
  const doIdxs: number[] = [];
  for (const d of dos) {
    doIdxs.push(d.index);
  }
  const dontIdxs: number[] = [];
  for (const d of donts) {
    dontIdxs.push(d.index);
  }

  let mi = 0;
  let doi = 0;
  let donti = 0;
  let enabled = true;
  let sum = 0;
  for (let i = 0; i < s.length; ++i) {
    const doIdx = doIdxs[doi];
    const dontIdx = dontIdxs[donti];
    const m = ms[mi];
    if (i === doIdx) {
      enabled = true;
      ++doi;
      continue;
    }
    if (i === dontIdx) {
      enabled = false;
      ++donti;
      continue;
    }
    if (!!m && i === m.index) {
      if (enabled) {
        const [, a, b] = m;
        sum += Number.parseInt(a!) * Number.parseInt(b!);
      }
      ++mi;
    }
  }
  return sum;
}
