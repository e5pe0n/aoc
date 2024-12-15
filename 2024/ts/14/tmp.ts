// https://e5pe0n.github.io/docs/algorithms/mathmatical-algorithms#extended-gcd
function extgcd(a: number, b: number, x: [number], y: [number]): number {
  let d = a;
  if (b !== 0) {
    d = extgcd(b, a % b, y, x);
    y[0] -= Math.floor(a / b) * x[0];
  } else {
    x[0] = 1;
    y[0] = 0;
  }
  return d;
}

const x: [number] = [0];
const y: [number] = [0];
extgcd(103, 101, x, y);
console.log(x, y);

// x = -50
// y = 51

// x * n1 + y * n2 = 1
// -50 * 103 + 51 * 101 = 1

// x = a1 * y * n2 + a2 * x * n1
//   = 51 * 51 * 101 + 86 * -50 * 103
//   = -180199

// 103 * 101 = 10403
// -180199 // 10403 = -18
// 18 * 10403 - 180199 = 7055
