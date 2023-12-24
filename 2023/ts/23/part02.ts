import fs from "fs";
import path from "path";
import { Queue } from "@datastructures-js/queue";
import { range } from "../utils";

{
  // const text = `#.#####################
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

  const start: Coord = [0, 1];
  const goal: Coord = [H - 1, W - 2];

  const within = (c: Coord) => 0 <= c[0] && c[0] < H && 0 <= c[1] && c[1] < W;

  const f = (c: Coord): number => c[0] * W + c[1];
  const g = (n: number): Coord => [Math.floor(n / W), n % W];

  const vs = new Set<number>([f(start), f(goal)]);
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (ij[i]![j] === "#") {
        continue;
      }
      let cnt = 0;
      for (const [di, dj] of didjs) {
        const ni = i + di;
        const nj = j + dj;
        if (within([ni, nj]) && ij[ni]![nj] !== "#") {
          ++cnt;
        }
      }
      if (cnt > 2) {
        vs.add(f([i, j]));
      }
    }
  }

  const graph = new Map<number, Map<number, number>>();
  const visited = range(H).map(() => range(W).map(() => false));
  for (let i = 0; i < H; ++i) {
    for (let j = 0; j < W; ++j) {
      if (ij[i]![j] === "#" || visited[i]![j] || vs.has(f([i, j]))) {
        continue;
      }
      let d = 1;
      const _vs: Coord[] = [];
      const q = new Queue<Coord>([[i, j]]);
      visited[i]![j] = true;
      while (!q.isEmpty()) {
        const [_i, _j] = q.dequeue();
        for (const [di, dj] of didjs) {
          const ni = _i + di;
          const nj = _j + dj;
          if (within([ni, nj]) && !visited[ni]![nj] && ij[ni]![nj] !== "#") {
            if (vs.has(f([ni, nj]))) {
              _vs.push([ni, nj]);
              continue;
            }
            ++d;
            visited[ni]![nj] = true;
            q.enqueue([ni, nj]);
          }
        }
      }
      {
        if (graph.has(f(_vs[0]!))) {
          const m = graph.get(f(_vs[0]!))!;
          m.set(f(_vs[1]!), Math.max(m.get(f(_vs[1]!)) ?? 0, d));
        } else {
          graph.set(f(_vs[0]!), new Map([[f(_vs[1]!), d]]));
        }
      }
      {
        if (graph.has(f(_vs[1]!))) {
          const m = graph.get(f(_vs[1]!))!;
          m.set(f(_vs[0]!), Math.max(m.get(f(_vs[0]!)) ?? 0, d));
        } else {
          graph.set(f(_vs[1]!), new Map([[f(_vs[0]!), d]]));
        }
      }
    }
  }

  const _visited = new Map<number, boolean>(
    Array.from(graph.keys()).map((k) => [k, false])
  );
  const dfs = (u: number, d: number): number => {
    if (u === f(goal)) {
      return d;
    }

    let maxd = 0;
    for (const [v, e] of graph.get(u)!.entries()) {
      if (!_visited.get(v)) {
        _visited.set(v, true);
        const res = dfs(v, d + e + 1);
        _visited.set(v, false);
        maxd = Math.max(maxd, res);
      }
    }
    return maxd;
  };

  _visited.set(f(start), true);
  console.log(dfs(f(start), 0)); // 6586
}
