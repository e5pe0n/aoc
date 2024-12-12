import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
import { solve as solve02 } from "./part02.js";

describe.only("part01", () => {
  test("example", () => {
    const res = solve01("input-example.txt");
    expect(res).toBe(140);
  });
  test("example02", () => {
    const res = solve01("input-example-02.txt");
    expect(res).toBe(772);
  });
  test("example03", () => {
    const res = solve01("input-example-03.txt");
    expect(res).toBe(1930);
  });
  test("input", () => {
    const res = solve01("input.txt");
    expect(res).toBe(1451030);
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
