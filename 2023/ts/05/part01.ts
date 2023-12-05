import fs from "fs";
import path from "path";

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

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const seeds = text
    .split("\n")[0]!
    .split(":")[1]!
    .trim()
    .split(/\s/)
    .map(Number);

  const maps = text
    .split("\n")
    .slice(2)
    .join("\n")
    .split("\n\n")
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
            srcLb <= n && n < srcLb + len ? destLb + (n - srcLb) : acc(n);
        },
        (n: number) => n
      );
    });

  const locs = seeds.map((seed) => maps.reduce((acc, v) => v(acc), seed));
  console.log(Math.min(...locs)); // 226172555
}
