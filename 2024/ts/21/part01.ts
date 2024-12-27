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

function initNumPadStepss(): Record<NumPadKey, Record<NumPadKey, Dir[][]>> {
  const NumPadStepss = {};
  for (const u of numPadKeys) {
    // @ts-expect-error
    NumPadStepss[u] = {};
    for (const v of numPadKeys) {
      // @ts-expect-error
      NumPadStepss[u][v] = [];
    }
  }
  return NumPadStepss as Record<NumPadKey, Record<NumPadKey, Dir[][]>>;
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

function initDirPadSteps(): Record<DirPadKey, Record<DirPadKey, Dir[]>> {
  const DirPadSteps = {};
  for (const u of dirPadKeys) {
    // @ts-expect-error
    DirPadSteps[u] = {};
    for (const v of dirPadKeys) {
      // @ts-expect-error
      DirPadSteps[u][v] = [];
    }
  }
  return DirPadSteps as Record<DirPadKey, Record<DirPadKey, Dir[]>>;
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
function initDirPadCnt(): Record<DirPadKey, Record<DirPadKey, number>> {
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
    NumPadStepss[k][kk].push(ss);
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

const DirPadCnt = initDirPadCnt();
const DirPadSteps = initDirPadSteps();
function bfsDirPad(start: [number, number]) {
  const k = DirPad[start[0]]![start[1]]!;
  const dists = initDirPadDists();
  const q: [number, number, Dir[]][] = [[start[0], start[1], []]];
  while (q.length > 0) {
    const [ii, jj, ss] = q.shift()!;
    const kk = DirPad[ii]![jj]!;
    let cnt = 0;
    for (let i = 0; i < ss.length - 1; ++i) {
      if (ss[i] !== ss[i + 1]) {
        ++cnt;
      }
    }
    if (ss.length > dists[k][kk] || cnt > DirPadCnt[k][kk]) {
      continue;
    }
    dists[k][kk] = ss.length;
    DirPadCnt[k][kk] = cnt;
    DirPadSteps[k][kk] = ss;
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

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
  const codes = lines.map((line) => `A${line}`.split("")) as NumPadKey[][];
  let res = 0;
  for (const code of codes) {
    const Ds: DirPadKey[] = [];
    for (let i = 0; i < code.length - 1; ++i) {
      const stepss = NumPadStepss[code[i]!][code[i + 1]!];
      let minSteps: DirPadKey[] | undefined = undefined;
      for (const steps of stepss) {
        const ds: DirPadKey[] = ["A", ...steps, "A"];
        const ds2: DirPadKey[] = ["A"];
        for (let i = 0; i < ds.length - 1; ++i) {
          ds2.push(...DirPadSteps[ds[i]!][ds[i + 1]!], "A");
        }
        const ds3: DirPadKey[] = [];
        for (let i = 0; i < ds2.length - 1; ++i) {
          ds3.push(...DirPadSteps[ds2[i]!][ds2[i + 1]!], "A");
        }
        if (!minSteps || minSteps.length > ds3.length) {
          minSteps = ds3;
        }
      }
      Ds.push(...(minSteps ?? []));
    }
    res += Ds.length * Number(code.slice(1, -1).join(""));
  }
  return res;
}
