import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ButtonType = "A" | "B";

type Button = {
  type: ButtonType;
  dx: number;
  dy: number;
};

type ButtonA = Button & {
  type: "A";
};

type ButtonB = Button & {
  type: "B";
};

type Prize = {
  x: number;
  y: number;
};

const RE_A = /Button\sA:\sX\+(\d+),\sY\+(\d+)/;
const RE_B = /Button\sB:\sX\+(\d+),\sY\+(\d+)/;
const RE_PRIZE = /Prize:\sX=(\d+),\sY=(\d+)/;

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function solve(filename: string): number {
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
        dx: Number(m[1]!),
        dy: Number(m[2]!),
      });
      continue;
    }
    m = line.match(RE_B);
    if (m) {
      buttonBs.push({
        type: "B",
        dx: Number(m[1]!),
        dy: Number(m[2]!),
      });
      continue;
    }
    m = line.match(RE_PRIZE);
    if (m) {
      prizes.push({
        x: Number(m[1]!),
        y: Number(m[2]!),
      });
    }
  }
  const N = buttonAs.length;
  let res = 0;
  for (let i = 0; i < N; ++i) {
    const btnA = buttonAs[i]!;
    const btnB = buttonBs[i]!;
    const prize = prizes[i]!;
    const g = gcd(btnA.dx, btnA.dy);
    const d = btnB.dx * (btnA.dy / g) - btnB.dy * (btnA.dx / g);
    const p = prize.x * (btnA.dy / g) - prize.y * (btnA.dx / g);
    const b = p / d;
    if (!(Number.isInteger(b) && b >= 0)) {
      continue;
    }
    const a = (prize.x - btnB.dx * b) / btnA.dx;
    if (!(Number.isInteger(a) && a >= 0)) {
      continue;
    }
    res += 3 * a + b;
  }
  return res;
}
