// TODO: improve performance
import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  //   const text = `seeds: 79 14 55 13

  // seed-to-soil map:
  // 50 98 2
  // 52 50 48

  // soil-to-fertilizer map:
  // 0 15 37
  // 37 52 2
  // 39 0 15

  // fertilizer-to-water map:
  // 49 53 8
  // 0 11 42
  // 42 0 7
  // 57 7 4

  // water-to-light map:
  // 88 18 7
  // 18 25 70

  // light-to-temperature map:
  // 45 77 23
  // 81 45 19
  // 68 64 13

  // temperature-to-humidity map:
  // 0 69 1
  // 1 0 69

  // humidity-to-location map:
  // 60 56 37
  // 56 93 4
  // `;
  performance.mark("started");

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const ns = text.split("\n")[0]!.split(/:\s+/)[1]!.split(/\s+/).map(Number);

  type Range = {
    start: number;
    len: number;
  };

  const rs = range(0, ns.length, 2).map(
    (i) => (n: number) => ns[i]! <= n && n < ns[i]! + ns[i + 1]!
  );

  const maps = text
    .split("\n")
    .slice(2)
    .join("\n")
    .split("\n\n")
    .reverse()
    .map((s) => {
      const mapSs = s.split("\n").slice(1);
      return mapSs.reduce(
        (acc, v) => {
          const [destLb, srcLb, len] = v.split(/\s/).map(Number) as [
            number,
            number,
            number
          ];

          return (n: number) =>
            destLb <= n && n < destLb + len ? srcLb + (n - destLb) : acc(n);
        },
        (n: number) => n
      );
    });

  for (let loc = 0; loc < 10 ** 9; ++loc) {
    const src = maps.reduce((acc, v) => v(acc), loc);
    if (rs.some((r) => r(src))) {
      console.log(loc); // 47909639
      break;
    }
  }

  performance.mark("finished");
  console.log(
    performance.measure("elapsed-time", "started", "finished").duration
  ); // 39220.13245999999
}
