import { test, expect, describe } from "vitest";
import { solve as solve01 } from "./part01.js";
import { solve as solve02 } from "./part02.js";

describe("part01", () => {
  test("example", () => {
    const res = solve01("input-example.txt");
    expect(res).toBe(7);
  });
  test("input", () => {
    const res = solve01("input.txt");
    expect(res).toBe(1476);
  });
});

describe("part02", () => {
  test("example", () => {
    const res = solve02("input-example.txt");
    expect(res).toBe("co,de,ka,ta");
  });
  test("input", () => {
    const res = solve02("input.txt");
    expect(res).toBe("ca,dw,fo,if,ji,kg,ks,oe,ov,sb,ud,vr,xr");
  });
});
