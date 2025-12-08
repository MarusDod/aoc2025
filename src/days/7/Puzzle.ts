import { sumBy } from "../../utils/fp.ts";

type Piece = "S" | "|" | "^" | ".";

const parseInput = (input: string) =>
  input
    .split("\n")
    .filter(Boolean)
    .map((i) => i.split("") as Piece[]);

const firstGameIteration = (pieces: Piece[][]) => {
  let nSplits = 0;
  for (let level = 0; level < pieces.length - 1; level++) {
    const beamIndexes = pieces[level]
      .map((p, index) => [p, index])
      .filter(([p]) => p === "S" || p === "|")
      .map(([_, index]) => index as number);

    if (!beamIndexes.length) {
      break;
    }

    for (const beam of beamIndexes) {
      if (pieces[level + 1][beam] === "^") {
        nSplits++;

        if (beam - 1 >= 0 && pieces[level + 1][beam - 1] !== "^") {
          pieces[level + 1][beam - 1] = "|";
        }

        if (
          beam + 1 < pieces[0].length - 1 &&
          pieces[level + 1][beam + 1] !== "^"
        ) {
          pieces[level + 1][beam + 1] = "|";
        }
      } else {
        pieces[level + 1][beam] = "|";
      }
    }
  }

  return nSplits;
};

export const first = (input: string) => {
  const pieces = parseInput(input);

  return firstGameIteration(pieces);
};

export const expectedFirstSolution = "21";

const secondGameIteration = (pieces: Piece[][]): number => {
  const SIndex = pieces[0].indexOf("S");

  const levelBeams = [{ [SIndex]: 1 }] as Record<number, number>[];

  for (let level = 0; level < pieces.length - 1; level++) {
    const beamIndexes = levelBeams[level];

    if (!Object.entries(beamIndexes).length) {
      break;
    }

    levelBeams[level + 1] = {};

    for (const [b, n] of Object.entries(beamIndexes)) {
      const beam = Number(b);

      const pushBeam = (index: number) => {
        if (!levelBeams[level + 1][index]) {
          levelBeams[level + 1][index] = 0;
        }
        levelBeams[level + 1][index] += n;
      };

      if (pieces[level + 1][beam] === "^") {
        if (beam - 1 >= 0 && pieces[level + 1][beam - 1] !== "^") {
          pushBeam(beam - 1);
        }

        if (
          beam + 1 < pieces[0].length - 1 &&
          pieces[level + 1][beam + 1] !== "^"
        ) {
          pushBeam(beam + 1);
        }
      } else {
        pushBeam(beam);
      }
    }
  }

  return sumBy(Object.entries(levelBeams.at(-1)!), (x) => Number(x[1])) + 1;
};

export const second = (input: string) => {
  const pieces = parseInput(input);

  return secondGameIteration(pieces);
};

export const expectedSecondSolution = "40";
