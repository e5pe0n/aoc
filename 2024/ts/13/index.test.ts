import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
import { solve as solve02 } from "./part02.js";

describe("part01", () => {
  test("example", () => {
    const res = solve01("input-example.txt");
    expect(res).toBe(480);
  });
  test("input", () => {
    const res = solve01("input.txt");
    expect(res).toBe(28753);
  });
});

describe("part02", () => {
  test("example", () => {
    const res = solve02("input-example.txt");
    expect(res).toBe(875318608908n);
  });
  test("input", () => {
    const res = solve02("input.txt");
    expect(res).toBe(102718967795500n);
  });
});
