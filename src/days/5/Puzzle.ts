import { identity, sumBy } from "../../utils/fp.ts";

type Range = [number, number];

type Puzzle = {
  ranges: Range[];
  ingredients: number[];
};

const parseInput = (input: string): Puzzle => {
  const [rangesText, ingredientsText] = input.split("\n\n");

  const ranges = rangesText
    .split("\n")
    .filter(Boolean)
    .map((r) => r.split("-").map(Number) as Range);

  const ingredients = ingredientsText.split("\n").filter(Boolean).map(Number);

  return {
    ranges,
    ingredients,
  };
};

const isIngredientInRange = (range: Range, x: number) =>
  x >= range[0] && x <= range[1];

const doRangesOverlap = (range1: Range, range2: Range): boolean =>
  range1[0] <= range2[1] && range2[0] <= range1[1];

const mergeRanges = (range1: Range, range2: Range): Range => {
  if (!doRangesOverlap) {
    throw new Error("wtf");
  }

  const start = Math.min(range1[0], range2[0]);
  const end = Math.max(range1[1], range2[1]);

  return [start, end];
};

const simplifyRanges = (ranges: Range[]): Range[] => {
  for (const [i, range] of ranges.entries()) {
    for (const [j, secondRange] of ranges.entries()) {
      if (i === j) {
        continue;
      }

      if (doRangesOverlap(range, secondRange)) {
        return [
          mergeRanges(range, secondRange),
          ...ranges.filter((_, index) => i !== index && j !== index),
        ];
      }
    }
  }

  return ranges;
};

export const first = (input: string) => {
  const puzzle = parseInput(input);

  return puzzle.ingredients.filter((i) =>
    puzzle.ranges.some((r) => isIngredientInRange(r, i))
  ).length;
};

export const expectedFirstSolution = "3";

export const second = (input: string) => {
  const puzzle = parseInput(input);

  let ranges = puzzle.ranges;

  while (true) {
    const newRanges = simplifyRanges(ranges);

    if (newRanges.length === ranges.length) {
      break;
    }

    ranges = newRanges;
  }

  return sumBy(
    ranges.map((r) => r[1] - r[0] + 1),
    identity
  );
};

export const expectedSecondSolution = "14";
