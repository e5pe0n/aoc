import fs from "fs";
import path from "path";

// const text = `
// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
// `.trim();

const text = fs
  .readFileSync(path.join(__dirname, "./input.txt"), { encoding: "utf-8" })
  .trim();

const d = {
  one: "1",
  "1": "1",
  two: "2",
  "2": "2",
  three: "3",
  "3": "3",
  four: "4",
  "4": "4",
  five: "5",
  "5": "5",
  six: "6",
  "6": "6",
  seven: "7",
  "7": "7",
  eight: "8",
  "8": "8",
  nine: "9",
  "9": "9",
} as const;
const RE = new RegExp("(" + Object.keys(d).join("|") + ")");

const revD = Object.entries(d)
  .map(([k, v]) => [k.split("").reverse().join(""), v] as const)
  .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
const REV_RE = new RegExp("(" + Object.keys(revD).join("|") + ")");

const ss = text.split("\n");
const fsts = ss.map((s) => d[s.match(RE)![0]! as keyof typeof d]);

const revSs = text.split("").reverse().join("").split("\n");
const lasts = revSs
  .map((s) => revD[s.match(REV_RE)![0]! as keyof typeof revD] as string)
  .reverse();

const sum = fsts
  .map((s, i) => Number(s + lasts[i]!))
  .reduce((acc, v) => acc + v, 0);

console.log(sum); // 54530
