import {
  add,
  fromDigits,
  getRange,
  identity,
  multiply,
  sumBy,
  transposeArray,
  zip,
} from "../../utils/fp.ts";

const parseInput = (input: string): (string | number)[][] =>
  input
    .split("\n")
    .filter(Boolean)
    .map((i) =>
      i
        .split(" ")
        .filter((x) => x !== "")
        .map((x) => (Number.isNaN(Number(x)) ? x : Number(x)))
    );

export const first = (input: string) => {
  const puzzle = parseInput(input);

  const game = transposeArray(puzzle);

  return sumBy(
    game.map((g) => {
      const numbers = g.slice(0, -1) as number[];
      const operator = g.at(-1);

      return operator === "*" ? multiply(...numbers) : add(...numbers);
    }),
    identity
  );
};

export const expectedFirstSolution = "4277556";

const parseSecondInput = (input: string) => {
  return input
    .split("\n")
    .filter(Boolean)
    .map((x) => x.split("").map((x) => (x.match(/[0-9]/) ? Number(x) : x)));
};

export const second = (input: string) => {
  const puzzle = parseSecondInput(input);

  const numbers = puzzle.slice(0, -1);

  const initialIndexes = puzzle
    .at(-1)!
    .map((p, i) => [p, i] as [any, number])
    .filter(([p, i]) => p === "*" || p === "+")
    .map(([p, i]) => i);

  const indexRanges = zip(initialIndexes, [
    ...initialIndexes.slice(1).map((i) => i - 2),
    puzzle[0].length - 1,
  ]);

  return add(
    ...indexRanges.map(([min, max]) => {
      const operator = puzzle.at(-1)![min];

      const fn = operator === "*" ? multiply : add;

      return fn(
        ...getRange(min, max).map((i) =>
          fromDigits(
            numbers.map((n) => n[i]).filter((n) => typeof n === "number")
          )
        )
      );
    })
  );
};

export const expectedSecondSolution = "3263827";
