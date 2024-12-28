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

export function solve(filename: string): bigint {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
  let A = BigInt(lines[0]!.match(A_RE)![1]!);
  let B = BigInt(lines[1]!.match(B_RE)![1]!);
  let C = BigInt(lines[2]!.match(C_RE)![1]!);
  const prog = lines[4]!.match(P_RE)![1]!.split(",").map(Number);

  function getCombo(n: number): bigint {
    switch (n) {
      case 0:
      case 1:
      case 2:
      case 3:
        return BigInt(n);
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

  let res = 0n;
  let out = 0n;
  function compute(opcode: Opcode, operand: number, ptr: number): number {
    switch (opcode) {
      case 0:
        A = A / 2n ** getCombo(operand);
        return ptr + 2;
      case 1:
        B = B ^ BigInt(operand);
        return ptr + 2;
      case 2:
        B = getCombo(operand) % 8n;
        return ptr + 2;
      case 3:
        if (A === 0n) {
          return ptr + 2;
        }
        return operand;
      case 4:
        B = B ^ C;
        return ptr + 2;
      case 5:
        out = getCombo(operand) % 8n;
        return prog.length;
      case 6:
        B = A / 2n ** getCombo(operand);
        return ptr + 2;
      case 7:
        C = A / 2n ** getCombo(operand);
        return ptr + 2;
      default:
        throw new Error(`Invalid opcode: ${opcode}`);
    }
  }

  function dfs(pos: number, resA: bigint) {
    if (pos < 0) {
      res = resA;
      return true;
    }
    for (let i = 0; i < 8; ++i) {
      A = (resA << 3n) | BigInt(i);
      let j = 0;
      while (j < prog.length) {
        j = compute(prog[j]! as Opcode, prog[j + 1]!, j);
      }
      if (
        out === BigInt(prog[pos]!) &&
        dfs(pos - 1, (resA << 3n) | BigInt(i))
      ) {
        return true;
      }
    }
    return false;
  }

  dfs(prog.length - 1, 0n);
  return res;
}
