import fs from "fs";
import path from "path";

{
  //   const text = `0 3 6 9 12 15
  // 1 3 6 10 15 21
  // 10 13 16 21 30 45
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const f = (ns: number[]): number => {
    if (ns.length === 1) {
      return ns[0]!;
    }

    const ds: number[] = [];
    for (let i = 0; i < ns.length - 1; ++i) {
      ds.push(ns[i + 1]! - ns[i]!);
    }

    if (ds.every((d) => ds[0]! === d)) {
      return ns.at(-1)! + ds[0]!;
    }

    return ns.at(-1)! + f(ds);
  };

  const lines = text.trim().split("\n");
  const hs = lines.map((line) =>
    line
      .trim()
      .split(/\s+/)
      .map((s) => Number(s))
  );
  const sum = hs.map(f).reduce((acc, v) => acc + v, 0);
  console.log(sum); // 1987402313
}
