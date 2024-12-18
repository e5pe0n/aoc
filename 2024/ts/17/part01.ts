import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const A_RE = /Register A: (\d+)/;
const B_RE = /Register B: (\d+)/;
const C_RE = /Register C: (\d+)/;
const P_RE = /Program: (\d(,\d)*)/;

const sevenBitInts = [0, 1, 2, 3, 4, 5, 6, 7] as const;
type N = (typeof sevenBitInts)[number];
type Opcode = (typeof sevenBitInts)[number];

export function solve(filename: string): string {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
  let A = Number(lines[0]!.match(A_RE)![1]!);
  let B = Number(lines[1]!.match(B_RE)![1]!);
  let C = Number(lines[2]!.match(C_RE)![1]!);
  const prog = lines[4]!.match(P_RE)![1]!.split(",").map(Number);

  function getCombo(n: number): number {
    switch (n) {
      case 0:
      case 1:
      case 2:
      case 3:
        return n;
      case 4:
        return A;
      case 5:
        return B;
      case 6:
        return C;
      default:
        throw new Error(`Invalid combo: ${n}`);
    }
  }

  const out: number[] = [];

  function compute(opcode: Opcode, operand: number, ptr: number): number {
    switch (opcode) {
      case 0:
        A = Math.floor(A / 2 ** getCombo(operand));
        return ptr + 2;
      case 1:
        B = B ^ operand;
        return ptr + 2;
      case 2:
        B = getCombo(operand) % 8;
        return ptr + 2;
      case 3:
        if (A === 0) {
          return ptr + 2;
        }
        return operand;
      case 4:
        B = B ^ C;
        return ptr + 2;
      case 5:
        out.push(getCombo(operand) % 8);
        return ptr + 2;
      case 6:
        B = Math.floor(A / 2 ** getCombo(operand));
        return ptr + 2;
      case 7:
        C = Math.floor(A / 2 ** getCombo(operand));
        return ptr + 2;
      default:
        throw new Error(`Invalid opcode: ${opcode}`);
    }
  }

  let i = 0;
  while (i < prog.length) {
    i = compute(prog[i]! as Opcode, prog[i + 1]!, i);
  }

  return out.join(",");
}
