import fs from "fs";
import path from "path";

{
  //   const text = `
  // Time:      7  15   30
  // Distance:  9  40  200
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const lines = text.trim().split("\n");
  const time = Number(lines[0]!.split(/:\s+/)[1]!.split(/\s+/).join(""));
  const distance = Number(lines[1]!.split(/:\s+/)[1]!.split(/\s+/).join(""));

  const dlt = time * time - 4 * distance;
  if (dlt < 0) {
    console.log(0);
    process.exit();
  }

  const xl = 0.5 * (time - dlt ** 0.5);
  const holdingL = Math.ceil(xl);

  const xr = 0.5 * (time + dlt ** 0.5);
  const holdingR = Math.floor(xr);

  console.log(holdingR - holdingL + 1); // 42588603
}
