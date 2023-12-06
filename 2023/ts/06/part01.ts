import fs from "fs";
import path from "path";
import { range, zip } from "../utils";

{
  //   const text = `
  // Time:      7  15   30
  // Distance:  9  40  200
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const lines = text.trim().split("\n");
  const times = lines[0]!.split(/:\s+/)[1]!.split(/\s+/).map(Number);
  const distances = lines[1]!.split(/:\s+/)[1]!.split(/\s+/).map(Number);

  const sum = zip(times, distances)
    .map(([t, d]) => {
      const cnt = range(1, t)
        .map((holding) => {
          const moving = t - holding;
          const dist = moving * holding;
          return Number(dist > d);
        })
        .reduce((acc, v) => acc + v, 0);
      return cnt;
    })
    .reduce((acc, v) => acc * v, 1);

  console.log(sum); // 345015
}
