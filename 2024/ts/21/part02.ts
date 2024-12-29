import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const numPadKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
] as const;
type NumPadKey = (typeof numPadKeys)[number];

const dirs = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
} as const;
type Dir = keyof typeof dirs;

function initNumPadStepss(): Record<
  NumPadKey,
  Record<NumPadKey, DirPadKey[][]>
> {
  const NumPadStepss = {};
  for (const u of numPadKeys) {
    // @ts-expect-error
    NumPadStepss[u] = {};
    for (const v of numPadKeys) {
      // @ts-expect-error
      NumPadStepss[u][v] = [];
    }
  }
  return NumPadStepss as Record<NumPadKey, Record<NumPadKey, DirPadKey[][]>>;
}
function initNumPadDists(): Record<NumPadKey, Record<NumPadKey, number>> {
  const NumPadSteps = {};
  for (const u of numPadKeys) {
    // @ts-expect-error
    NumPadSteps[u] = {};
    for (const v of numPadKeys) {
      // @ts-expect-error
      NumPadSteps[u][v] = Number.MAX_SAFE_INTEGER;
    }
  }
  return NumPadSteps as Record<NumPadKey, Record<NumPadKey, number>>;
}

const dirPadKeys = ["^", ">", "v", "<", "A"] as const;
type DirPadKey = (typeof dirPadKeys)[number];

function initDirPadStepss(): Record<
  DirPadKey,
  Record<DirPadKey, DirPadKey[][]>
> {
  const DirPadStepss = {};
  for (const u of dirPadKeys) {
    // @ts-expect-error
    DirPadStepss[u] = {};
    for (const v of dirPadKeys) {
      // @ts-expect-error
      DirPadStepss[u][v] = [];
    }
  }
  return DirPadStepss as Record<DirPadKey, Record<DirPadKey, DirPadKey[][]>>;
}
function initDirPadDists(): Record<DirPadKey, Record<DirPadKey, number>> {
  const DirPadSteps = {};
  for (const u of dirPadKeys) {
    // @ts-expect-error
    DirPadSteps[u] = {};
    for (const v of dirPadKeys) {
      // @ts-expect-error
      DirPadSteps[u][v] = Number.MAX_SAFE_INTEGER;
    }
  }
  return DirPadSteps as Record<DirPadKey, Record<DirPadKey, number>>;
}

const NumPad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [undefined, "0", "A"],
] as (NumPadKey | undefined)[][];
const NumPadH = NumPad.length;
const NumPadW = NumPad[0]!.length;
function inNumPad(i: number, j: number): boolean {
  return (
    0 <= i &&
    i < NumPadH &&
    0 <= j &&
    j < NumPadW &&
    NumPad[i]![j] !== undefined
  );
}

const DirPad = [
  [undefined, "^", "A"],
  ["<", "v", ">"],
] as (DirPadKey | undefined)[][];
const DirPadH = DirPad.length;
const DirPadW = DirPad[0]!.length;
function inDirPad(i: number, j: number): boolean {
  return (
    0 <= i &&
    i < DirPadH &&
    0 <= j &&
    j < DirPadW &&
    DirPad[i]![j] !== undefined
  );
}

const NumPadStepss = initNumPadStepss();
function bfsNumPad(start: [number, number]) {
  const k = NumPad[start[0]]![start[1]]!;
  const dists = initNumPadDists();
  const q: [number, number, Dir[]][] = [[start[0], start[1], []]];
  while (q.length > 0) {
    const [ii, jj, ss] = q.shift()!;
    const kk = NumPad[ii]![jj]!;
    if (ss.length > dists[k][kk]) {
      continue;
    }
    dists[k][kk] = ss.length;
    NumPadStepss[k][kk].push([...ss, "A"]);
    for (const [d, [di, dj]] of Object.entries(dirs) as [
      Dir,
      [number, number],
    ][]) {
      const ni = ii + di;
      const nj = jj + dj;
      if (inNumPad(ni, nj)) {
        q.push([ni, nj, [...ss, d]]);
      }
    }
  }
}
for (let i = 0; i < NumPadH; ++i) {
  for (let j = 0; j < NumPadW; ++j) {
    if (NumPad[i]![j] === undefined) {
      continue;
    }
    bfsNumPad([i, j]);
  }
}

const DirPadStepss = initDirPadStepss();
function bfsDirPad(start: [number, number]) {
  const k = DirPad[start[0]]![start[1]]!;
  const dists = initDirPadDists();
  const q: [number, number, Dir[]][] = [[start[0], start[1], []]];
  while (q.length > 0) {
    const [ii, jj, ss] = q.shift()!;
    const kk = DirPad[ii]![jj]!;
    if (ss.length > dists[k][kk]) {
      continue;
    }
    dists[k][kk] = ss.length;
    DirPadStepss[k][kk].push([...ss, "A"]);
    for (const [d, [di, dj]] of Object.entries(dirs) as [
      Dir,
      [number, number],
    ][]) {
      const ni = ii + di;
      const nj = jj + dj;
      if (inDirPad(ni, nj)) {
        q.push([ni, nj, [...ss, d]]);
      }
    }
  }
}
for (let i = 0; i < DirPadH; ++i) {
  for (let j = 0; j < DirPadW; ++j) {
    if (DirPad[i]![j] === undefined) {
      continue;
    }
    bfsDirPad([i, j]);
  }
}

const M = new Map<string, bigint>();

function dfs(ds: DirPadKey[], cnt: number, n: number): bigint {
  const k = `${ds.join("")}:${cnt}`;
  if (cnt === n) {
    const res = BigInt(ds.length - 1);
    M.set(k, res);
    return res;
  }
  if (M.has(k)) {
    return M.get(k)!;
  }
  let res = 0n;
  for (let i = 0; i < ds.length - 1; ++i) {
    let minStepsLen = undefined;
    for (const steps of DirPadStepss[ds[i]!][ds[i + 1]!]) {
      const stepsLen = dfs(["A", ...steps], cnt + 1, n);
      if (!minStepsLen || minStepsLen > stepsLen) {
        minStepsLen = stepsLen;
      }
    }
    res += minStepsLen!;
  }
  M.set(k, res);
  return res;
}

export function solve(filename: string, N: number): bigint {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
  const codes = lines.map((line) => `A${line}`.split("")) as NumPadKey[][];
  let res = 0n;
  for (const code of codes) {
    // for (const code of codes.slice(0, 1)) {
    let len = 0n;
    for (let i = 0; i < code.length - 1; ++i) {
      let minStepsLen = undefined;
      for (const steps of NumPadStepss[code[i]!][code[i + 1]!]) {
        const stepsLen = dfs(["A", ...steps], 0, N);
        if (!minStepsLen || minStepsLen > stepsLen) {
          minStepsLen = stepsLen;
        }
      }
      len += minStepsLen!;
    }
    res += len * BigInt(code.slice(1, -1).join(""));
  }
  return res;
}
