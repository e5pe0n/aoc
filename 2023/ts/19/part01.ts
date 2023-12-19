import fs from "fs";
import path from "path";

{
  // const text = `px{a<2006:qkq,m>2090:A,rfg}
  // pv{a>1716:R,A}
  // lnx{m>1548:A,A}
  // rfg{s<537:gd,x>2440:R,A}
  // qs{s>3448:A,lnx}
  // qkq{x<1416:A,crn}
  // crn{x>2662:A,R}
  // in{s<1351:px,qqz}
  // qqz{s>2770:qs,m<1801:hdj,R}
  // gd{a>3333:R,R}
  // hdj{m>838:A,pv}

  // {x=787,m=2655,a=1222,s=2876}
  // {x=1679,m=44,a=2067,s=496}
  // {x=2036,m=264,a=79,s=2244}
  // {x=2461,m=1339,a=466,s=291}
  // {x=2127,m=1623,a=2188,s=1013}
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const [rulesS, partsS] = text.trim().split("\n\n") as [string, string];

  type Part = {
    x: number;
    m: number;
    a: number;
    s: number;
  };

  const RE = /(\w+)\{(.+)\}/;
  const COND_RE = /([xmas])(<|>)(\d+):(\w+)/;

  const rules = new Map<string, (p: Part) => string>();
  for (const ruleS of rulesS.split("\n")) {
    const m = ruleS.trim().match(RE)!;
    const name = m[1]!;
    const conds = m[2]!.split(",");
    const condF = conds
      .slice(0, -1)
      .reverse()
      .reduce(
        (acc, v) => {
          const condM = v.match(COND_RE)!;
          const xmas = condM[1]! as keyof Part;
          const cmp = condM[2]!;
          const n = Number(condM[3]);
          const dest = condM[4]!;
          return (p: Part) =>
            (cmp === ">" && p[xmas] > n) || (cmp === "<" && p[xmas] < n)
              ? dest
              : acc(p);
        },
        (p: Part) => conds.at(-1)!
      );
    rules.set(name, condF);
  }

  const parts = partsS.split("\n").map(
    (partS) =>
      partS
        .trim()
        .slice(1, -1)
        .split(",")
        .reduce((acc, v) => {
          const [xmas, n] = v.split("=") as [string, string];
          return {
            ...acc,
            [xmas]: Number(n),
          };
        }, {}) as Part
  );

  const run = (p: Part, name: string): string => {
    const dest = rules.get(name)!(p);
    return ["A", "R"].includes(dest) ? dest : run(p, dest);
  };

  const sum = parts.reduce((acc, v) => {
    const res = run(v, "in");
    return (
      acc + (res === "A" ? Object.values(v).reduce((acc, v) => acc + v, 0) : 0)
    );
  }, 0);

  console.log(sum); // 425811
}
