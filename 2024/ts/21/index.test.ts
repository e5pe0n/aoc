import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
import { solve as solve02 } from "./part02.js";

describe("part01", () => {
  test("example", () => {
    const res = solve01("input-example.txt");
    expect(res).toBe(126384);
  });
  test("input", () => {
    const res = solve01("input.txt");
    expect(res).toBe(94426);
  });
});

describe("part02", () => {
  test("example 2", () => {
    const res = solve02("input-example.txt", 2);
    expect(res).toBe(126384n);
  });
  test("input 2", () => {
    const res = solve02("input.txt", 2);
    expect(res).toBe(94426n);
  });
  test("input", () => {
    const res = solve02("input.txt", 25);
    expect(res).toBe(118392478819140n);
  });
});
