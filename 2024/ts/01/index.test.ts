import { test, expect, describe } from "vitest";
import { solve01 } from "./part01.js";

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
