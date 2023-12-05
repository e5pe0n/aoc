import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  //   const text = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  // Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  // Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  // Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  // Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
  // `;

  type Card = {
    wins: Set<number>;
    yourss: number[];
  };

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  const cards = text
    .trim()
    .split("\n")
    .map((line) => {
      const [_, nsS] = line.trim().split(":") as [string, string];
      const [winsS, yourssS] = nsS.trim().split("|") as [string, string];

      const wins = new Set(
        winsS
          .trim()
          .split(/\s+/)
          .map((winS) => Number(winS))
      );
      const yourss = yourssS
        .trim()
        .split(/\s+/)
        .map((yoursS) => Number(yoursS));

      return { wins, yourss } satisfies Card;
    });

  const ns = range(cards.length).map(() => 1);

  for (const [i, card] of cards.entries()) {
    const cnt = card.yourss.reduce(
      (acc, v) => acc + Number(card.wins.has(v)),
      0
    );
    for (let j = i + 1; j < Math.min(cards.length, i + 1 + cnt); ++j) {
      ns[j] += ns[i]!;
    }
  }

  const sum = ns.reduce((acc, v) => acc + v, 0);

  console.log(sum); //
}
