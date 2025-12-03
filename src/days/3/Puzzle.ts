import { identity, sumBy } from "../../utils/fp.ts";

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter(Boolean)
    .map((i) => i.trim().split("").map(Number));
};

export const first = (input: string) => {
  const banks = parseInput(input);

  return sumBy(
    banks.map((b) => {
      const highest = b.slice(0, -1).toSorted((x, y) => y - x)[0];

      const highestIndex = b.indexOf(highest);

      const lowest = b.slice(highestIndex + 1).toSorted((x, y) => y - x)[0];

      return Number(`${highest}${lowest}`);
    }),
    identity
  );
};

export const expectedFirstSolution = "357";

export const second = (input: string) => {
  const banks = parseInput(input);

  return sumBy(
    banks.map((b) => {
      let missing = 12;
      let str = "";

      let lastIndex = -1;

      while (missing) {
        const startIndex = Math.max(12 - missing, lastIndex + 1);
        const endIndex = b.length - missing + 1;

        const searchableArray = b.slice(startIndex, endIndex);
        //console.log({ missing, startIndex, endIndex, searchableArray });

        const newDigit = searchableArray.toSorted((x, y) => y - x)[0];

        str += `${newDigit}`;

        lastIndex = searchableArray.indexOf(newDigit) + startIndex;

        missing--;
      }

      return Number(str);
    }),
    identity
  );
};

export const expectedSecondSolution = "3121910778619";
