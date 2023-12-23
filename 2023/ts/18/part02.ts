// TODO: Refactor; remove `lr`.
import fs from "fs";
import path from "path";
import { PriorityQueue } from "@datastructures-js/priority-queue";

{
  // const text = `R 6 (#70c710)
  // D 5 (#0dc571)
  // L 2 (#5713f0)
  // D 2 (#d2c081)
  // R 2 (#59c680)
  // D 2 (#411b91)
  // L 5 (#8ceee2)
  // U 2 (#caa173)
  // L 1 (#1b58a2)
  // U 2 (#caa171)
  // R 2 (#7807d2)
  // U 3 (#a77fa3)
  // L 2 (#015232)
  // U 2 (#7a21e3)
  // `;

  // const text = `R 8 (#70c710)
  // D 7 (#0dc571)
  // L 4 (#5713f0)
  // D 1 (#d2c081)
  // L 2 (#59c680)
  // U 3 (#411b91)
  // R 4
  // U 3
  // L 4
  // D 1
  // L 2
  // U 3
  // `;

  //   const text = `R 7
  // U 2
  // L 1
  // U 1
  // R 4
  // U 2
  // R 2
  // D 3
  // L 3
  // D 9
  // R 8
  // U 6
  // L 4
  // D 3
  // R 2
  // D 1
  // L 3
  // U 5
  // R 6
  // D 8
  // L 11
  // U 6
  // L 1
  // U 1
  // L 7
  // D 2
  // R 2
  // D 5
  // L 4
  // U 3
  // R 1
  // U 7
  // L 1
  // U 1
  // R 2
  // U 1
  // R 2
  // D 1
  // R 2
  // D 1
  // L 3
  // D 2
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  type Dig = {
    dir:
      | 0 // R
      | 1 // D
      | 2 // L
      | 3; // U
    len: number;
  };
  const didjs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ] as const;

  const RE = /#(\w+)/;
  const digs = text
    .trim()
    .split("\n")
    .map((line) => {
      const m = line.match(RE)!;
      const hex = m[1]!;
      return {
        dir: Number(hex.at(-1)) as Dig["dir"],
        len: Number.parseInt(hex.slice(0, -1), 16),
      } satisfies Dig;
    });

  // type DirType = "R" | "D" | "L" | "U";
  // const dirs: Record<DirType, Dig["dir"]> = {
  //   R: 0,
  //   D: 1,
  //   L: 2,
  //   U: 3,
  // };

  // const digs = text
  //   .trim()
  //   .split("\n")
  //   .map((line) => {
  //     const m = line.trim().split(/\s+/);
  //     return {
  //       dir: dirs[m[0]! as DirType],
  //       len: Number(m[1]),
  //     } satisfies Dig;
  //   });

  type Coord = [number, number];
  type Graph = Map<number, Map<number, Coord[]>>;

  const _graph: Graph = new Map();

  const initSetter =
    (g: Graph): ((c: Coord, nc: Coord) => Graph) =>
    ([i, j]: Coord, [ni, nj]: Coord) =>
      g.set(
        i,
        (g.get(i) ?? (new Map() as Map<number, Coord[]>)).set(j, [
          [ni, nj],
          ...(g.get(i)?.get(j) ?? []),
        ])
      );

  let [mini, maxi, minj, maxj] = [0, 0, 0, 0];
  let [i, j] = [0, 0];
  const _setter = initSetter(_graph);
  for (const dig of digs) {
    const [di, dj] = didjs[dig.dir];
    const ni = i + di * dig.len;
    const nj = j + dj * dig.len;
    _setter([i, j], [ni, nj]);
    _setter([ni, nj], [i, j]);
    i = ni;
    j = nj;
    mini = Math.min(mini, i);
    maxi = Math.max(maxi, i);
    minj = Math.min(minj, j);
    maxj = Math.max(maxj, j);
  }

  const H = maxi - mini + 1;
  const W = maxj - minj + 1;

  const ioffset = 0 - mini;
  const joffset = 0 - minj;

  const graph: Graph = new Map(
    Array.from(_graph.entries()).map(([ui, v]) => [
      ui + ioffset,
      new Map(
        Array.from(v.entries()).map(([uj, cs]) => [
          uj + joffset,
          cs.map(([vi, vj]) => [vi + ioffset, vj + joffset]),
        ])
      ),
    ])
  );

  const visited = new Map(
    Array.from(graph.entries()).map(([i, v]) => [
      i,
      new Map(Array.from(v.keys()).map((j) => [j, false])),
    ])
  );

  let si = H;
  let sj = W;
  for (const [i, m] of graph.entries()) {
    for (const j of m.keys()) {
      if (i < si) {
        si = i;
        sj = j;
      }
    }
  }

  type V = {
    lr: "l" | "r";
    c: Coord;
  };

  const q = new PriorityQueue<V>((a, b) => {
    const {
      c: [ui, uj],
    } = a;
    const {
      c: [vi, vj],
    } = b;

    if (ui < vi) {
      return -1;
    }
    if (ui > vi) {
      return 1;
    }

    return uj < vj ? -1 : 1;
  });

  let lsi = 0;
  let lsj = 0;
  for (const [vi, vj] of graph.get(si)!.get(sj)!.values()) {
    if (vi > si) {
      lsi = vi;
      lsj = vj;
      break;
    }
  }

  q.enqueue({ lr: "r", c: [si, sj] });
  q.enqueue({ lr: "l", c: [lsi, lsj] });
  visited.set(si, visited.get(si)!.set(sj, true));
  visited.set(lsi, visited.get(lsi)!.set(lsj, true));

  const getpc = (c: Coord): Coord => {
    const [ui, uj] = c;
    for (const [vi, vj] of graph.get(ui)!.get(uj)!.values()) {
      if (visited.get(vi)!.get(vj)) {
        return [vi, vj];
      }
    }
    throw new Error(`pc not found: c=${c}.`);
  };

  let sum = 0;
  while (!q.isEmpty()) {
    const {
      lr,
      c: [i, j],
    } = q.dequeue();

    for (const [ni, nj] of graph.get(i)!.get(j)!.values()) {
      if (visited.get(ni)!.get(nj)) {
        continue;
      }
      const [pi, pj] = getpc([i, j]);
      visited.set(ni, visited.get(ni)!.set(nj, true));
      if (j === nj) {
        q.enqueue({ lr, c: [ni, nj] });
        continue;
      }
      let nni = 0;
      let nnj = 0;
      for (const [_i, _j] of graph.get(ni)!.get(nj)!.values()) {
        if (_i !== i && _j !== j) {
          nni = _i;
          nnj = _j;
          break;
        }
      }
      const dj = Math.abs(nj - j);
      switch (lr) {
        case "l":
          if (nj > j) {
            if (pi < i && i > nni) {
              sum -= (dj + 1) * (H - i - 1);
            } else if (pi > i && i < nni) {
              sum -= (dj - 1) * (H - i - 1);
            } else {
              sum -= dj * (H - i - 1);
            }
          } else {
            if (pi > i && i < nni) {
              sum += (dj + 1) * (H - i);
            } else if (pi < i && i > nni) {
              sum += (dj - 1) * (H - i);
            } else {
              sum += dj * (H - i);
            }
          }
          break;
        case "r":
          if (nj > j) {
            if (pi > i && i < nni) {
              sum += (dj + 1) * (H - i);
            } else if (pi < i && i > nni) {
              sum += (dj - 1) * (H - i);
            } else {
              sum += dj * (H - i);
            }
          } else {
            if (pi < i && i > nni) {
              sum -= (dj + 1) * (H - i - 1);
            } else if (pi > i && i < nni) {
              sum -= (dj - 1) * (H - i - 1);
            } else {
              sum -= dj * (H - i - 1);
            }
          }
          break;
      }
      q.enqueue({ lr, c: [ni, nj] });
    }
  }

  console.log(sum); // 44644464596918
}
