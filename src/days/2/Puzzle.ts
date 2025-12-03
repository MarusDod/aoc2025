import { identity, sumBy } from "../../utils/fp.ts";

type Range = [number, number];

const range = (x: number, y: number) => {
  const arr = [];

  for (let i = x; i <= y; i++) {
    arr.push(i);
  }

  return arr;
};

const isSequence = (x: number) => {
  const str = String(x);

  if (str.length % 2 !== 0) {
    return false;
  }

  return str.slice(0, str.length / 2) === str.slice(str.length / 2);
};

const parseInput = (input: string): Range[] =>
  input.split(",").map((i) => i.split("-").map(Number) as Range);

export const first = (input: string) => {
  const ranges = parseInput(input);

  return sumBy(
    ranges
      .flatMap((r) => range(r[0], r[1]).filter(isSequence))
      .filter((x) => typeof x === "number"),
    identity
  );
};

export const expectedFirstSolution = "1227775554";

const isRepeatedSequence = (x: number): boolean => {
  const str = String(x);

  for (let i = 1; i < str.length; i++) {
    const instances = str.length / i;
    if (instances !== Math.floor(instances)) {
      continue;
    }

    const initial_partition = str.slice(0, i);

    let is_sequence = true;

    for (let j = 0; j < instances; j++) {
      const current_partition = str.slice(j * i, j * i + i);

      if (initial_partition !== current_partition) {
        is_sequence = false;
        break;
      }
    }

    if (is_sequence) {
      return true;
    }
  }

  return false;
};

export const second = (input: string) => {
  const ranges = parseInput(input);

  return sumBy(
    ranges
      .flatMap((r) => range(r[0], r[1]).filter(isRepeatedSequence))
      .filter((x) => typeof x === "number"),
    identity
  );
};

export const expectedSecondSolution = "4174379265";
