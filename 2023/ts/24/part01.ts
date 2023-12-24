import fs from "fs";
import path from "path";

{
  //   const text = `19, 13, 30 @ -2,  1, -2
  // 18, 19, 22 @ -1, -1, -2
  // 20, 25, 34 @ -2, -2, -4
  // 12, 31, 28 @ -1, -2, -1
  // 20, 19, 15 @  1, -5, -3
  // `;

  //   const MIN_X = 7;
  //   const MIN_Y = 7;
  //   const MAX_X = 27;
  //   const MAX_Y = 27;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const MIN_X = 200000000000000;
  const MIN_Y = 200000000000000;
  const MAX_X = 400000000000000;
  const MAX_Y = 400000000000000;

  type Coord = [number, number, number];
  type Delta = [number, number, number];
  type _Hail = {
    c: Coord;
    d: Delta;
  };
  const _hails = text
    .trim()
    .split("\n")
    .map((line) => {
      const [coord, delta] = line.trim().split(/\s+@\s+/) as [string, string];
      return {
        c: coord.split(/,\s+/).map(Number),
        d: delta.split(/,\s+/).map(Number),
      } as _Hail;
    });

  type Hail = _Hail & {
    a: number;
    b: number;
  };
  const hails = _hails.map((v) => {
    const { c, d } = v;
    if (d[0] === 0) {
      throw new Error("d[0] === 0");
    }
    return {
      a: d[1] / d[0],
      b: (c[1] * d[0] - c[0] * d[1]) / d[0],
      ...v,
    } satisfies Hail;
  });

  let cnt = 0;
  for (let i = 0; i < hails.length - 1; ++i) {
    for (let j = i + 1; j < hails.length; ++j) {
      const hi = hails[i]!;
      const hj = hails[j]!;
      if (hi.d[1] * hj.d[0] === hj.d[1] * hi.d[0]) {
        continue;
      }

      const x = -(hi.b - hj.b) / (hi.a - hj.a);
      const y = hi.a * x + hi.b;

      if (!(MIN_X <= x && x <= MAX_X && MIN_Y <= y && y <= MAX_Y)) {
        continue;
      }

      if (
        (x - hi.c[0]) * hi.d[0] > 0 &&
        (y - hi.c[1]) * hi.d[1] > 0 &&
        (x - hj.c[0]) * hj.d[0] > 0 &&
        (y - hj.c[1]) * hj.d[1] > 0
      ) {
        ++cnt;
      }
    }
  }

  console.log(cnt); // 27328
}
