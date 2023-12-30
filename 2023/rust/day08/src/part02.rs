pub fn solve() {
    let steps = [12643, 14257, 15871, 18023, 19637, 16409];
    let mut lcm: i64 = 1;
    for step in steps {
        lcm = (lcm * step) / gcd(lcm, step);
    }
    println!("{lcm}"); // 11795205644011
}

fn gcd(a: i64, b: i64) -> i64 {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
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
