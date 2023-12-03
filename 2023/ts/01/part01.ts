import fs from "fs";
import path from "path";

// const text = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet
// `;

const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const RE = /\d/g;

const sum = text
  .trim()
  .split("\n")
  .map((s) => {
    const ns = s.match(RE)!;
    return Number(ns[0]! + ns.at(-1));
  })
  .reduce((acc, v) => acc + v, 0);

console.log(sum); // 56049
