import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const s = fs.readFileSync(fp, "utf-8").split("\n").slice(0, -1);

  let sum = 0;
  return sum;
}
