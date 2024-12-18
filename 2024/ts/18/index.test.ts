import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
// import { solve as solve02 } from "./part02.js";

describe("part01", () => {
  test("example", () => {
    const res = solve01("input-example.txt", 7, 12);
    expect(res).toBe(22);
  });
  test("input", () => {
    const res = solve01("input.txt", 71, 1024);
    expect(res).toBe(248);
  });
});

// describe("part02", () => {
//   test("example", () => {
//     const res = solve02("input-example-02.txt");
//     expect(res).toBe();
//   });
//   test.only("input", () => {
//     const res = solve02("input.txt");
//     expect(res).toBe();
//   });
// });
