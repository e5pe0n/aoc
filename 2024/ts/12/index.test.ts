import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
import { solve as solve02 } from "./part02.js";

describe("part01", () => {
  test("example", () => {
    const res = solve01("input-example.txt");
    expect(res).toBe(140);
  });
  test("example-XO", () => {
    const res = solve01("input-example-XO.txt");
    expect(res).toBe(772);
  });
  test("example-lerge", () => {
    const res = solve01("input-example-large.txt");
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
    expect(res).toBe(80);
  });
  test("example-XO", () => {
    const res = solve02("input-example-XO.txt");
    expect(res).toBe(436);
  });
  test("example-E", () => {
    const res = solve02("input-example-E.txt");
    expect(res).toBe(236);
  });
  test("example-AB", () => {
    const res = solve02("input-example-AB.txt");
    expect(res).toBe(368);
  });
  test("example-large", () => {
    const res = solve02("input-example-large.txt");
    expect(res).toBe(1206);
  });
  test("input", () => {
    const res = solve02("input.txt");
    expect(res).toBe(859494);
  });
});
