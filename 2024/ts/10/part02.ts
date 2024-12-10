import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { range } from "../lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type File = {
  id: number;
  ptr: number;
  length: number;
  prev?: File;
  next?: File;
};

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const content = fs.readFileSync(fp, "utf-8").trim();
  const memory = content.split("").map(Number);
  let ptr = 0;
  const root: File = { id: 0, ptr, length: memory[0]! };
  ptr += root.length;
  let curr: File | undefined = root;
  for (let i = 1; i < memory.length; ++i) {
    if (i % 2 === 0) {
      const file: File = {
        id: curr!.id + 1,
        ptr,
        length: memory[i]!,
        prev: curr,
      };
      ptr += file.length;
      curr.next = file;
      curr = file;
    } else {
      ptr += memory[i]!;
    }
  }
  const touched = range(Math.ceil(memory.length / 2)).map(() => false);
  while (curr) {
    let head = root;
    const nextCurr: File | undefined = curr.prev;
    if (!touched[curr.id]) {
      while (head.next && head.ptr < curr.ptr) {
        const space = head.next.ptr - (head.ptr + head.length);
        if (space >= curr.length) {
          curr.ptr = head.ptr + head.length;
          if (curr.prev) {
            curr.prev.next = curr.next;
          }
          if (curr.next) {
            curr.next.prev = curr.prev;
          }
          const tail = head.next;
          head.next = curr;
          curr.prev = head;
          curr.next = tail;
          tail.prev = curr;
          break;
        }
        head = head.next;
      }
    }
    touched[curr.id] = true;
    curr = nextCurr;
  }
  curr = root;
  let res = 0;
  while (curr) {
    const sum =
      curr.id *
      (((curr.ptr + curr.length - 1) * (curr.ptr + curr.length)) / 2 -
        ((curr.ptr - 1) * curr.ptr) / 2);
    res += sum;
    curr = curr.next;
  }
  return res;
}
