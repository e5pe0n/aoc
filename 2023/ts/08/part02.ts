{
  const gcd = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  const steps = [12643, 14257, 15871, 18023, 19637, 16409];
  let lcm = 1;
  for (const step of steps) {
    lcm = (lcm * step) / gcd(lcm, step);
  }
  console.log(lcm); // 11795205644011
}

// As: [ 'QXA', 'PDA', 'TDA', 'QQA', 'PPA', 'AAA' ]
// Zs: [ 'HLZ', 'PXZ', 'VJZ', 'NBZ', 'XBZ', 'ZZZ' ]

// each path from nodes which end with A loops by constant step.
//  QXA -> HLZ -> HLZ -> ... : 12643 step
//  PDA -> XBZ -> XBZ -> ... : 14257 step
//  TDA -> VJZ -> VJZ -> ... : 15871 step
//  QQA -> PXZ -> PXZ -> ... : 18023 step
//  PPA -> XBZ -> XBZ -> ... : 19637 step
//  AAA -> ZZZ -> ZZZ -> ... : 16409 step
