import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

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
  let last = curr;
  while (curr) {
    console.log(curr);
    curr = curr?.prev;
  }
  curr = last;
  while (curr.prev) {
    let head = root;
    while (head.next) {
      const space = head.next.ptr - (head.ptr + head.length);
      if (space >= curr.length) {
        const tail = head.next;
        head.next = curr;
        curr.prev = head;
        curr.next = tail;
        tail.prev = curr;
        break;
      }
      head = head.next;
    }
    curr = curr.prev;
  }
  curr = root;
  let res = 0;
  let j = 0;
  console.log();
  while (curr) {
    console.log(curr);
    for (let i = ptr; i < curr.ptr + curr.length; ++i) {
      res += i * curr.id;
    }
    curr = curr.next;
    if (j++ > 10) {
      break;
    }
  }
  return res;
}
