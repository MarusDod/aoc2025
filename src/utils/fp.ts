export const scanl = <T, U>(
  arr: T[],
  fn: (prev: U, cur: T) => U,
  initial: U
) => {
  const ret: U[] = [];

  arr.reduce((acc, cur) => {
    const next = fn(acc, cur);

    ret.push(next);

    return next;
  }, initial);

  return ret;
};

export const sumBy = <T>(arr: T[], fn: (x: T) => number): number => {
  return arr.map(fn).reduce((prev, cur) => prev + cur, 0);
};

export const identity = <T>(x: T): T => x;

export const unique = <T>(x: T[]): T[] => [...new Set(x)];
