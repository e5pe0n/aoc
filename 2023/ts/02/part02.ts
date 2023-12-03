import fs from "fs";
import path from "path";

{
  // const text = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  // Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  // Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });

  type Subset = {
    numBlues: number;
    numGreens: number;
    numReds: number;
  };

  type Game = {
    id: number;
    subsets: Subset[];
  };

  const games = text
    .trim()
    .split("\n")
    .map((s) => {
      const [head, tail] = s.split(":") as [string, string];
      return {
        id: Number(head.split(" ").at(-1))!,
        subsets: tail.split(";").map((v) => {
          const subset: Subset = {
            numBlues: 0,
            numGreens: 0,
            numReds: 0,
          };

          v.split(",").forEach((v) => {
            const [sn, color] = v.trim().split(" ") as [
              string,
              "blue" | "green" | "red"
            ];

            const n = Number(sn);
            switch (color) {
              case "blue":
                subset.numBlues = n;
                break;
              case "green":
                subset.numGreens = n;
                break;
              case "red":
                subset.numReds = n;
                break;
            }
          });

          return subset;
        }),
      } satisfies Game;
    });

  const sum = games
    .map((game) => {
      const maxSubset: Subset = game.subsets.reduce(
        (acc, v) => ({
          numBlues: Math.max(acc.numBlues, v.numBlues),
          numGreens: Math.max(acc.numGreens, v.numGreens),
          numReds: Math.max(acc.numReds, v.numReds),
        }),
        {
          numBlues: 0,
          numGreens: 0,
          numReds: 0,
        }
      );

      return maxSubset.numBlues * maxSubset.numGreens * maxSubset.numReds;
    })
    .reduce((acc, v) => acc + v, 0);

  console.log(sum); // 65122
}
