import fs from "fs";
import path from "path";

{
  //   const text = `RL

  // AAA = (BBB, CCC)
  // BBB = (DDD, EEE)
  // CCC = (ZZZ, GGG)
  // DDD = (DDD, DDD)
  // EEE = (EEE, EEE)
  // GGG = (GGG, GGG)
  // ZZZ = (ZZZ, ZZZ)
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const lines = text.trim().split("\n");
  const lrs = Array.from(lines[0]!);

  const graph = new Map<string, [string, string]>();
  for (const line of lines.slice(2)) {
    const m = line.match(/(?<u>\w+)\s+=\s+\((?<v1>\w+), (?<v2>\w+)\)/)!;
    graph.set(m.groups!.u!, [m.groups!.v1!, m.groups!.v2!]);
  }

  let u = "AAA";
  let cnt = 0;
  while (true) {
    for (const lr of lrs) {
      const [v1, v2] = graph.get(u)!;
      u = lr === "L" ? v1 : v2;
      ++cnt;
      if (u === "ZZZ") {
        console.log(cnt);
        process.exit();
      }
    }
  }
}
