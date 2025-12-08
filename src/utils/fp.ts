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

export const unique = <T>(arr: T[], fn: (x: T) => any): T[] => {
  const seen = new Set();

  const res: T[] = [];

  for (const x of arr) {
    if (seen.has(fn(x))) {
      continue;
    }

    seen.add(fn(x));
    res.push(x);
  }

  return res;
};

export const transposeArray = <T>(arr: T[][]): T[][] => {
  const res: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (res.length <= j) {
        res[j] = [];
      }

      res[j][i] = arr[i][j];
    }
  }

  return res;
};

export const multiply = (...arr: number[]): number =>
  arr.reduce((acc, x) => acc * x, 1);

export const add = (...arr: number[]): number =>
  arr.reduce((acc, x) => acc + x, 0);

export const zip = <T>(arr1: T[], arr2: T[]) => {
  const minLength = Math.min(arr1.length, arr2.length);

  const res: [T, T][] = [];

  for (let i = 0; i < minLength; i++) {
    res.push([arr1[i], arr2[i]]);
  }

  return res;
};

export function* getRange(x: number, y: number) {
  for (let i = x; i <= y; i++) {
    yield i;
  }
}

export function* infiniteIterator(from: number = 0) {
  for (let i = from; true; i++) {
    yield i;
  }
}

export const fromDigits = (arr: number[]): number => {
  const reverseArr = arr.reverse();

  return getRange(0, reverseArr.length - 1).reduce(
    (acc, i) => acc + reverseArr[i] * 10 ** i,
    0
  );
};

export const removeArrayIndexes = <T>(arr: T[], indexes: number[]) =>
  arr
    .map((a, index) => (indexes.includes(index) ? null : a))
    .filter(Boolean) as T[];
