import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
// import { solve as solve02 } from "./part02.js";

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

// describe("part02", () => {
//   test("example", () => {
//     const res = solve02("input-example.txt");
//     expect(res).toBe("co,de,ka,ta");
//   });
//   test.only("input", () => {
//     const res = solve02("input.txt");
//     expect(res).toBe();
//   });
// });
