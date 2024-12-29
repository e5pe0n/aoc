import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
import { solve as solve02 } from "./part02.js";

describe("part01", () => {
  test("example", () => {
    const res = solve01("input-example.txt");
    expect(res).toBe(4);
  });
  test("example-large", () => {
    const res = solve01("input-example-large.txt");
    expect(res).toBe(2024);
  });
  test("input", () => {
    const res = solve01("input.txt");
    expect(res).toBe(46362252142374);
  });
});

describe("part02", () => {
  test("input", () => {
    const res = solve02("input.txt");
    expect(res).toBe("cbd,gmh,jmq,qrh,rqf,z06,z13,z38");
  });
});
