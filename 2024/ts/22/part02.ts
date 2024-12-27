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
  const pricess: number[][] = [];
  for (const line of lines) {
    const secret = Number(line);
    const gen = nextSecretGenerator(secret);
    const prices: number[] = [secret % 10];
    for (let i = 0; i < 2000; ++i) {
      prices.push(gen.next().value % 10);
    }
    pricess.push(prices);
  }
  const changess: number[][] = [];
  for (const prices of pricess) {
    const changes: number[] = [];
    for (let i = 0; i < prices.length - 1; ++i) {
      changes.push(prices[i + 1]! - prices[i]!);
    }
    changess.push(changes);
  }
  const wk2p: Map<string, number> = new Map();
  for (const [i, changes] of changess.entries()) {
    const wks: Set<string> = new Set();
    for (let j = 0; j < changes.length - 3; ++j) {
      const w = changes.slice(j, j + 4);
      const wk = w.join(",");
      if (!wks.has(wk)) {
        wk2p.set(wk, (wk2p.get(wk) ?? 0) + pricess[i]![j + 4]!);
      }
      wks.add(wk);
    }
  }
  const res = Math.max(...wk2p.values());
  return res;
}
