import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  // const text = `1,0,1~1,2,1
  // 0,0,2~2,0,2
  // 0,2,3~2,2,3
  // 0,0,4~0,2,4
  // 2,0,5~2,2,5
  // 0,1,6~2,1,6
  // 1,1,8~1,1,9
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  type Coord = [number, number, number];
  type Brick = {
    u: Coord;
    v: Coord;
    minx: number;
    miny: number;
    minz: number;
    maxx: number;
    maxy: number;
    maxz: number;
  };

  const _bricks = text
    .trim()
    .split("\n")
    .map((line) => {
      const [xyz, _xyz] = line.trim().split("~") as [string, string];
      const u = xyz.split(",").map(Number) as Coord;
      const v = _xyz.split(",").map(Number) as Coord;
      return {
        u,
        v,
        minx: Math.min(u[0], v[0]),
        miny: Math.min(u[1], v[1]),
        minz: Math.min(u[2], v[2]),
        maxx: Math.max(u[0], v[0]),
        maxy: Math.max(u[1], v[1]),
        maxz: Math.max(u[2], v[2]),
      } satisfies Brick;
    });

  const H = _bricks.reduce((acc, v) => Math.max(acc, v.maxx), 0) + 1;
  const W = _bricks.reduce((acc, v) => Math.max(acc, v.maxy), 0) + 1;

  const xy = range(H).map(() => range(W).map(() => -1));
  const zss = range(H).map(() => range(W).map(() => 0));
  const bricks = _bricks.sort((a, b) => a.minz - b.minz).slice(0);
  const supportings = bricks.map(() => new Set<number>());
  const supporteds = bricks.map(() => new Set<number>());
  for (const [i, brick] of bricks.entries()) {
    const { minx, maxx, miny, maxy, minz, maxz } = brick;
    let z = 0;
    for (let x = minx; x <= maxx; ++x) {
      for (let y = miny; y <= maxy; ++y) {
        z = Math.max(z, zss[x]![y]!);
      }
    }
    for (let x = minx; x <= maxx; ++x) {
      for (let y = miny; y <= maxy; ++y) {
        if (zss[x]![y]! === z && xy[x]![y]! >= 0) {
          supportings[xy[x]![y]!]!.add(i);
          supporteds[i]!.add(xy[x]![y]!);
        }
        xy[x]![y] = i;
        zss[x]![y] = z + (maxz - minz + 1);
      }
    }
  }

  let sum = 0;
  const involveds = supportings.map((v) => new Set<number>());
  for (let i = supportings.length - 1; i >= 0; --i) {
    for (const j of supportings[i]!) {
      involveds[i]!.add(j);
      for (const k of involveds[j]!) {
        involveds[i]!.add(k);
      }
    }
    if (
      !(
        supportings[i]!.size === 0 ||
        Array.from(supportings[i]!).every((v) => supporteds[v]!.size >= 2)
      )
    ) {
      console.log(i, involveds[i]!.size);
      sum += involveds[i]!.size;
    }
  }

  console.log(sum); // 89108: wrong
}
