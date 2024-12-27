import fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function* nextSecretGenerator(initSecret: number) {
  let secret = initSecret;
  while (true) {
    secret = prune(mix(secret, secret * 64));
    secret = prune(mix(secret, Math.floor(secret / 32)));
    secret = prune(mix(secret, secret * 2048));
    yield secret;
  }
  return secret;
}

function mix(secret: number, n: number) {
  return secret ^ n;
}

function prune(secret: number) {
  return (secret + 16777216 * 2048) % 16777216;
}

export function solve(filename: string): number {
  const fp = path.resolve(path.join(__dirname, filename));
  const lines = fs
    .readFileSync(fp, "utf-8")
    .trim()
    .split("\n")
    .map((line) => line.trim());
  let res = 0;
  for (const line of lines) {
    const secret = Number(line);
    const gen = nextSecretGenerator(secret);
    let resSecret = 0;
    for (let i = 0; i < 2000; ++i) {
      resSecret = gen.next().value;
    }
    res += resSecret;
  }
  return res;
}
