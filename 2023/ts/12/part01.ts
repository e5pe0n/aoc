// TODO: Should improve performance
import fs from "fs";
import path from "path";

{
  //   const text = `???.### 1,1,3
  // .??..??...?##. 1,1,3
  // ?#?#?#?#?#?#?#? 1,3,1,6
  // ????.#...#... 4,1,1
  // ????.######..#####. 1,6,5
  // ?###???????? 3,2,1
  // `;
  performance.mark("started");

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const eqArr = <T, U>(xs: T[], ys: U[]): boolean => {
    if (xs.length !== ys.length) {
      return false;
    }
    for (let i = 0; i < xs.length; ++i) {
      if (xs[i] !== ys[i]) {
        return false;
      }
    }
    return true;
  };

  type Record = {
    cells: string[];
    springs: number[];
  };

  const records = text
    .trim()
    .split("\n")
    .map((line) => {
      const [cellsS, springsS] = line.split(/\s+/) as [string, string];
      return {
        cells: Array.from(cellsS),
        springs: springsS.split(",").map(Number),
      } satisfies Record;
    });

  const sum = records
    .map((record) => {
      const qs = record.cells
        .map((v, i) => (v === "?" ? i : undefined))
        .filter((v): v is number => v !== undefined);

      let cnt = 0;
      for (let i = 0; i < 1 << qs.length; ++i) {
        const bs: number[] = [];
        for (let j = qs.length - 1; j >= 0; --j) {
          bs.push((i >> j) & 1);
        }

        const cs = [...record.cells];
        for (const [j, b] of bs.entries()) {
          cs[qs[j]!] = b ? "#" : ".";
        }

        const ss = cs
          .join("")
          .split(/\.+/)
          .map((v) => v.length)
          .filter((v) => v > 0);

        if (eqArr(ss, record.springs)) {
          ++cnt;
        }
      }

      return cnt;
    })
    .reduce((acc, v) => acc + v, 0);

  console.log(sum); // 6949

  performance.mark("finished");
  console.log(
    performance.measure("elapsed time", "started", "finished").duration
  ); // 3620.0855100005865
}
