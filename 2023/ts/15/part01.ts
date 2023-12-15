import fs from "fs";
import path from "path";

{
  // const text = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const ss = text.trim().split(",");
  const sum = ss
    .map((s) =>
      Array.from(s).reduce((acc, v) => ((acc + v.charCodeAt(0)) * 17) % 256, 0)
    )
    .reduce((acc, v) => acc + v, 0);

  console.log(sum); // 516469
}
