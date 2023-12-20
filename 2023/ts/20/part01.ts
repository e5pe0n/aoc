import fs from "fs";
import path from "path";
import { Queue } from "@datastructures-js/queue";

{
  //   const text = `broadcaster -> a, b, c
  // %a -> b
  // %b -> c
  // %c -> inv
  // &inv -> a
  // `;

  const text = fs.readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "ascii",
  });

  type Module =
    | {
        type: "button";
        vs: string[];
      }
    | {
        type: "broadcaster";
        vs: string[];
      }
    | {
        type: "%";
        status: boolean;
        vs: string[];
      }
    | {
        type: "&";
        inputs: Record<string, boolean>;
        vs: string[];
      }
    | {
        type: "untyped";
        vs: string[];
      };

  type Pulse = {
    type: boolean;
    u: string;
    v: string;
  };

  const modules = new Map<string, Module>([
    ["button", { type: "button", vs: ["broadcaster"] }],
  ]);
  for (const line of text.trim().split("\n")) {
    const [u, vsS] = line.split(/\s+->\s+/) as [string, string];
    const vs = vsS.split(/,\s+/).filter((v) => v.length > 0);
    if (u === "broadcaster") {
      modules.set("broadcaster", { type: "broadcaster", vs });
      continue;
    }
    const name = u.slice(1);
    if (u[0] === "%") {
      modules.set(name, {
        type: "%",
        status: false,
        vs,
      });
    } else {
      modules.set(name, {
        type: "&",
        inputs: {},
        vs,
      });
    }
  }

  for (const [k, m] of modules.entries()) {
    for (const v of m.vs) {
      const vm = modules.get(v);
      if (!vm) {
        modules.set(v, {
          type: "untyped",
          vs: [],
        });
        continue;
      }
      if (vm.type === "&") {
        modules.set(v, {
          ...vm,
          inputs: {
            ...vm.inputs,
            [k]: false,
          },
        });
      }
    }
  }

  let low = 0;
  let high = 0;
  for (let i = 0; i < 1000; ++i) {
    const pulses = new Queue<Pulse>([
      { type: false, u: "button", v: "broadcaster" },
    ]);
    while (!pulses.isEmpty()) {
      const p = pulses.dequeue();
      if (p.type) {
        ++high;
      } else {
        ++low;
      }
      const m = modules.get(p.v)!;
      switch (m.type) {
        case "broadcaster":
          for (const v of m.vs) {
            pulses.enqueue({ type: false, u: p.v, v });
          }
          break;
        case "%":
          if (p.type) {
            break;
          }
          modules.set(p.v, {
            ...m,
            status: !m.status,
          });
          for (const v of m.vs) {
            pulses.enqueue({ type: !m.status, u: p.v, v });
          }
          break;
        case "&":
          const nm = {
            ...m,
            inputs: {
              ...m.inputs,
              [p.u]: p.type,
            },
          };
          modules.set(p.v, nm);
          for (const v of nm.vs) {
            pulses.enqueue({
              type: !Object.values(nm.inputs).every((v) => v),
              u: p.v,
              v,
            });
          }
          break;
      }
    }
  }
  console.log(low * high); // 841763884
}
