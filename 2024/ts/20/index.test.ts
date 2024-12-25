import { test, expect, describe } from "vitest";
import { solve as solve01, solveExample as solveExample01 } from "./part01.js";
import { solve as solve02, solveExample as solveExample02 } from "./part02.js";

describe("part01", () => {
  test("example", () => {
    const res = solveExample01("input-example.txt");
    expect(res).toEqual([
      [14, 2],
      [14, 4],
      [2, 6],
      [4, 8],
      [2, 10],
      [3, 12],
      [1, 20],
      [1, 36],
      [1, 38],
      [1, 40],
      [1, 64],
    ]);
  });
  test("input", () => {
    const res = solve01("input.txt");
    expect(res).toBe(1293);
  });
});

describe("part02", () => {
  test("example", () => {
    const res = solveExample02("input-example.txt", 50);
    expect(res).toEqual([
      [32, 50],
      [31, 52],
      [29, 54],
      [39, 56],
      [25, 58],
      [23, 60],
      [20, 62],
      [19, 64],
      [12, 66],
      [14, 68],
      [12, 70],
      [22, 72],
      [4, 74],
      [3, 76],
    ]);
  });
  test("input", () => {
    const res = solve02("input.txt", 100);
    expect(res).toBe(977747);
  });
});
