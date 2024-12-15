import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
import { solve as solve02 } from "./part02.js";

describe.only("part01", () => {
  test("example", () => {
    const res = solve01("input-example.txt", 11, 7);
    expect(res).toBe(12);
  });
  test("input", () => {
    const res = solve01("input.txt", 101, 103);
    expect(res).toBe(218619120);
  });
});

describe("part02", () => {
  test("example", () => {
    const res = solve02("input-example.txt");
    expect(res).toBe();
  });
  test("input", () => {
    const res = solve02("input.txt");
    expect(res).toBe();
  });
});
