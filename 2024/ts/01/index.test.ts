import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
import { solve as solve02 } from "./part02.js";

describe("part01", () => {
  test("example", () => {
    const res = solve01("input01-example.txt");
    expect(res).toBe(11);
  });
  test("input", () => {
    const res = solve01("input01.txt");
    expect(res).toBe(1834060);
  });
});

describe("part02", () => {
  test("example", () => {
    const res = solve02("input01-example.txt");
    expect(res).toBe(31);
  });
  test("input", () => {
    const res = solve02("input01.txt");
    expect(res).toBe(21607792);
  });
});
