import fs from "fs";
import path from "path";
import { range } from "../utils";

{
  //   const text = `32T3K 765
  // T55J5 684
  // KK677 28
  // KTJJT 220
  // QQQJA 483
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  type Card = {
    labels: number[];
    bid: number;
    type: number;
  };

  const detType = (cnts: number[]): Card["type"] => {
    if (cnts[0]! === 5) {
      return 6; // five of a kind
    }
    if (cnts[0]! === 4) {
      return 5; // four of a kind
    }
    if (cnts[0]! === 3) {
      if (cnts[1]! === 2) {
        return 4; // full house
      }
      return 3; // three of a kind
    }
    if (cnts[0]! === 2) {
      if (cnts[1]! === 2) {
        return 2; // two pair
      }
      return 1; // one pair
    }
    return 0; // high card
  };

  const cards = text
    .trim()
    .split("\n")
    .map((line) => {
      const [labelsS, bidS] = line.split(/\s+/) as [string, string];
      const labels = Array.from(labelsS).map((v) => {
        if (v === "T") {
          return 10;
        }
        if (v === "J") {
          return 11;
        }
        if (v === "Q") {
          return 12;
        }
        if (v === "K") {
          return 13;
        }
        if (v === "A") {
          return 14;
        }
        return Number(v);
      });
      const bid = Number(bidS);
      const cnter = range(15).map(() => 0);
      for (const label of labels) {
        ++cnter[label];
      }
      const cnts = Array.from(cnter.values()).sort((a, b) => b - a);
      return {
        labels,
        bid,
        type: detType(cnts),
      } satisfies Card;
    });

  const sum = cards
    .sort(
      (a, b) =>
        a.type - b.type ||
        a.labels[0]! - b.labels[0]! ||
        a.labels[1]! - b.labels[1]! ||
        a.labels[2]! - b.labels[2]! ||
        a.labels[3]! - b.labels[3]! ||
        a.labels[4]! - b.labels[4]!
    )
    .reduce((acc, v, i) => acc + v.bid * (i + 1), 0);

  console.log(sum); // 253910319
}
