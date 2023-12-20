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
    x: [number, number];
    m: [number, number];
    a: [number, number];
    s: [number, number];
  };

  type XMAS = keyof Part;

  type Cmp = "<" | ">";

  const RE = /(\w+)\{(.+)\}/;
  const COND_RE = /([xmas])(<|>)(\d+):(\w+)/;

  type Edge =
    | {
        type: "tree";
        xmas: XMAS;
        cmp: Cmp;
        n: number;
        dest: string;
      }
    | {
        type: "leaf";
        dest: string;
      };

  const graph = new Map<string, Edge[]>();

  for (const ruleS of rulesS.split("\n")) {
    const m = ruleS.trim().match(RE)!;
    const src = m[1]!;
    const conds = m[2]!.split(",");
    const edges: Edge[] = conds.map((cond) => {
      const condM = cond.match(COND_RE);
      if (!condM) {
        return {
          type: "leaf",
          dest: cond,
        };
      }
      const xmas = condM[1]! as keyof Part;
      const cmp = condM[2]! as Cmp;
      const n = Number(condM[3]);
      const dest = condM[4]!;
      return {
        type: "tree",
        xmas,
        cmp,
        n,
        dest,
      };
    });
    graph.set(src, edges);
  }

  const dfs = (p: Part, src: string): number => {
    if (src === "A") {
      return Object.values(p).reduce(
        (acc, v) => acc * (v[1] > v[0] ? v[1] - v[0] + 1 : 0),
        1
      );
    }
    if (src === "R") {
      return 0;
    }

    let sum = 0;
    let np = p;
    for (const e of graph.get(src)!) {
      if (e.type === "leaf") {
        sum += dfs(p, e.dest);
      } else {
        if (e.cmp === "<") {
          const ub = Math.min(np[e.xmas][1], e.n - 1);
          sum += dfs({ ...np, [e.xmas]: [np[e.xmas][0], ub] }, e.dest);
          if (ub + 1 > np[e.xmas][1]) {
            break;
          }
          np[e.xmas] = [ub + 1, np[e.xmas][1]];
        } else {
          const lb = Math.max(p[e.xmas][0], e.n + 1);
          sum += dfs({ ...p, [e.xmas]: [lb, p[e.xmas][1]] }, e.dest);
          if (np[e.xmas][0] > lb - 1) {
            break;
          }
          np[e.xmas] = [np[e.xmas][0], lb - 1];
        }
      }
    }
    return sum;
  };

  console.log(
    dfs(
      {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000],
      },
      "in"
    )
  ); // 131796824371749
}
