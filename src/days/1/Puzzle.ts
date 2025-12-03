import { scanl, sumBy } from "../../utils/fp.ts";

type PuzzleInput = ["L" | "R", number];

const parseInput = (input: string): PuzzleInput[] =>
  input
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean)
    .map((i) => [i[0] as "L" | "R", Number(i.slice(1))]);

type OperationFn = (x: number, y: number) => number;

export const first = (input: string) => {
  const puzzle = parseInput(input);

  return scanl(
    puzzle,
    (prev, cur) => {
      const operation: OperationFn =
        cur[0] === "L" ? (x, y) => x - y : (x, y) => x + y;

      const result = operation(prev, cur[1]) % 100;

      const remainder = result % 100;

      return remainder < 0 ? remainder + 100 : remainder;
    },
    50
  ).filter((x) => x === 0).length;
};

export const expectedFirstSolution = "3";

export const second = (input: string) => {
  const puzzle = parseInput(input);

  return sumBy(
    scanl(
      puzzle,
      ([_, prev], cur) => {
        const operation: OperationFn =
          cur[0] === "L" ? (x, y) => x - y : (x, y) => x + y;

        const loopbacks = Math.floor(cur[1] / 100);

        const diff = cur[1] - loopbacks * 100;

        const newResult = operation(prev, diff);

        const normalizedResult = ((newResult % 100) + 100) % 100;

        const hasCrossedOver =
          (newResult !== normalizedResult && prev !== 0) ||
          (normalizedResult === 0 && !!diff);

        return [loopbacks + Number(hasCrossedOver), normalizedResult];
      },
      [0, 50]
    ),
    (x) => x[0]
  );
};

export const expectedSecondSolution = "6";
