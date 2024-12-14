import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ButtonType = "A" | "B";

type Button = {
  type: ButtonType;
  dx: bigint;
  dy: bigint;
};

type ButtonA = Button & {
  type: "A";
};

type ButtonB = Button & {
  type: "B";
};

type Prize = {
  x: bigint;
  y: bigint;
};

const RE_A = /Button\sA:\sX\+(\d+),\sY\+(\d+)/;
const RE_B = /Button\sB:\sX\+(\d+),\sY\+(\d+)/;
const RE_PRIZE = /Prize:\sX=(\d+),\sY=(\d+)/;

function gcd(a: bigint, b: bigint): bigint {
  return b === 0n ? a : gcd(b, a % b);
}

const offset = 10_000_000_000_000n;
// 9_007_199_254_740_991

export function solve(filename: string): bigint {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const buttonAs: ButtonA[] = [];
  const buttonBs: ButtonB[] = [];
  const prizes: Prize[] = [];
  for (const line of content.split("\n")) {
    let m = line.match(RE_A);
    if (m) {
      buttonAs.push({
        type: "A",
        dx: BigInt(m[1]!),
        dy: BigInt(m[2]!),
      });
      continue;
    }
    m = line.match(RE_B);
    if (m) {
      buttonBs.push({
        type: "B",
        dx: BigInt(m[1]!),
        dy: BigInt(m[2]!),
      });
      continue;
    }
    m = line.match(RE_PRIZE);
    if (m) {
      prizes.push({
        x: BigInt(m[1]!) + offset,
        y: BigInt(m[2]!) + offset,
      });
    }
  }
  const N = buttonAs.length;
  let res = 0n;
  for (let i = 0; i < N; ++i) {
    const btnA = buttonAs[i]!;
    const btnB = buttonBs[i]!;
    const prize = prizes[i]!;
    const g = gcd(btnA.dx, btnA.dy);
    // const d = btnB.dx * (btnA.dy / g) - btnB.dy * (btnA.dx / g);
    const d = btnB.dx * btnA.dy - btnB.dy * btnA.dx;
    const p = prize.x * btnA.dy - prize.y * btnA.dx;
    const mb = p % d;
    const b = p / d;
    if (mb !== 0n || b < 0) {
      continue;
    }
    const ma = (prize.x - btnB.dx * b) % btnA.dx;
    const a = (prize.x - btnB.dx * b) / btnA.dx;
    if (ma !== 0n || a < 0) {
      continue;
    }
    res += 3n * a + b;
  }
  return res;
}
