import fs from "fs";
import path from "path";
import { Queue } from "@datastructures-js/queue";
import { range } from "../utils";

{
  //   const text = `#.#####################
  // #.......#########...###
  // #######.#########.#.###
  // ###.....#.>.>.###.#.###
  // ###v#####.#v#.###.#.###
  // ###.>...#.#.#.....#...#
  // ###v###.#.#.#########.#
  // ###...#.#.#.......#...#
  // #####.#.#.#######.#.###
  // #.....#.#.#.......#...#
  // #.#####.#.#.#########v#
  // #.#...#...#...###...>.#
  // #.#.#v#######v###.###v#
  // #...#.>.#...>.>.#.###.#
  // #####v#.#.###v#.#.###.#
  // #.....#...#...#.#.#...#
  // #.#########.###.#.#.###
  // #...###...#...#...#.###
  // ###.###.#.###v#####v###
  // #...#...#.#.>.>.#.>.###
  // #.###.###.#.###.#.#v###
  // #.....###...###...#...#
  // #####################.#
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const ij = text
    .trim()
    .split("\n")
    .map((line) => Array.from(line.trim()));

  type Coord = [number, number];
  const didjs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ] as const;

  const H = ij.length;
  const W = ij[0]!.length;

  const s: Coord = [0, 1];
  const g: Coord = [H - 1, W - 2];
  const _visited = range(H).map(() => range(W).map(() => false));

  const within = (c: Coord) => 0 <= c[0] && c[0] < H && 0 <= c[1] && c[1] < W;

  type T = {
    c: Coord;
    d: number;
    visited: boolean[][];
  };
  _visited[s[0]]![s[1]] = true;
  let maxd = 1;
  const q = new Queue<T>([{ c: s, d: 0, visited: _visited }]);
  while (!q.isEmpty()) {
    const {
      c: [i, j],
      d,
      visited,
    } = q.dequeue();
    if (i === g[0] && j === g[1]) {
      maxd = Math.max(maxd, d);
      continue;
    }
    const ncs: Coord[] = [];
    for (const [di, dj] of didjs) {
      const ni = i + di;
      const nj = j + dj;
      if (within([ni, nj]) && !visited[ni]![nj] && ij[ni]![nj] !== "#") {
        if (
          (di === -1 && ij[ni]![nj] !== "v") ||
          (di === 1 && ij[ni]![nj] !== "^") ||
          (dj === -1 && ij[ni]![nj] !== ">") ||
          (dj === 1 && ij[ni]![nj] !== "<")
        ) {
          ncs.push([ni, nj]);
        }
      }
    }
    if (ncs.length === 1) {
      const [ni, nj] = ncs[0]!;
      visited[ni]![nj] = true;
      q.enqueue({
        c: [ni, nj],
        d: d + 1,
        visited,
      });
      continue;
    }
    for (const [ni, nj] of ncs) {
      const nvisited = visited.map((v) => v.map((v) => v));
      nvisited[ni]![nj] = true;
      q.enqueue({
        c: [ni, nj],
        d: d + 1,
        visited: nvisited,
      });
    }
  }

  console.log(maxd); // 2358
}
