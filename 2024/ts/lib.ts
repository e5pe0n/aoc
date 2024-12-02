/**
 * Crate a new Array such as [0, 1, ..., `stop - 1`].
 *
 * @example
 * ```
 * range(5);  // [0, 1, 2, 3, 4]
 * ```
 */
export function range(stop: number): number[];
/**
 * Create a new Array contains from `start` to `stop`(exclusive) by `step` in order.
 *
 * @example
 * ```
 * range(0, 5, 2);  // [0, 2, 4]
 * range(5, 0, -2); // [5, 3, 1]
 * ```
 */
export function range(start: number, stop: number, step: number): number[];
export function range(start: number, stop?: number, step?: number): number[] {
  // in case overload1, start = stop (the first arg), stop = undefined, step = undefined
  const _start = stop ? start : 0;
  const _stop = stop ?? start;
  const _step = step ?? 1;

  if (_step === 0) {
    throw new RangeError(
      `invalid argument: step must not be 0. step=${_step} given.`,
    );
  }

  const len = Math.ceil((_stop - _start) / _step);
  return len <= 0
    ? []
    : Array.from(new Array(len), (_, i) => _start + i * _step);
}
