import { test, expect, describe } from "vitest";
import { nextSecretGenerator, solve as solve01 } from "./part01.js";
import { range } from "../lib.js";
import { solve as solve02 } from "./part02.js";

describe("part01", () => {
  test("example123", () => {
    const gen = nextSecretGenerator(123);
    const res = range(10).map(() => gen.next().value);
    expect(res).toEqual([
      15887950, 16495136, 527345, 704524, 1553684, 12683156, 11100544, 12249484,
      7753432, 5908254,
    ]);
  });
  test("example", () => {
    const res = solve01("input-example.txt");
    expect(res).toBe(37327623);
  });
  test("input", () => {
    const res = solve01("input.txt");
    expect(res).toBe(12979353889);
  });
});

describe("part02", () => {
  test("example", () => {
    const res = solve02("input-example-02.txt");
    expect(res).toBe(23);
  });
  test("input", () => {
    const res = solve02("input.txt");
    expect(res).toBe(1449);
  });
});
