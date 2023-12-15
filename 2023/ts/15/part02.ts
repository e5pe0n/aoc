import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  // const text = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const RE = /([a-z]+)(=|\-)(\d)?/;

  const hash = (s: string): number =>
    Array.from(s).reduce((acc, v) => ((acc + v.charCodeAt(0)) * 17) % 256, 0);

  const boxes = range(256).map(() => new Map<string, number>());

  const ss = text.trim().split(",");
  ss.forEach((s) => {
    const m = s.match(RE)!;

    const [label, op, len] = [m![1]!, m![2]!, m![3]];
    const h = hash(label);
    if (op === "-") {
      boxes[h]!.delete(label);
    } else if (op === "=") {
      boxes[h]!.set(label, Number(len!));
    }
  });
  const sum = boxes.reduce(
    (acc, v, i) =>
      acc +
      Array.from(v.values()).reduce(
        (acc, v, j) => acc + (i + 1) * (j + 1) * v,
        0
      ),
    0
  );

  console.log(sum); // 221627
}
