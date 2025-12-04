type Char = "." | "@" | "#";

const parseInput = (input: string) =>
  input
    .split("\n")
    .filter(Boolean)
    .map((i) => i.split("")) as Char[][];

const removeRollsOfPaper = (
  game: Char[][]
): { removed: number; newGame: Char[][] } => {
  const newGame = structuredClone(game);

  const getAdjacentPaperCount = (y: number, x: number): number => {
    let count = 0;

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i === x && y === j) {
          continue;
        }

        if (game[j]?.[i] === "@") {
          count++;
        }
      }
    }

    return count;
  };

  let sum = 0;

  for (let j = 0; j < game.length; j++) {
    for (let i = 0; i < game[0].length; i++) {
      if (game[j][i] === "@") {
        if (getAdjacentPaperCount(j, i) < 4) {
          sum++;
          newGame[j][i] = "#";
        }
      }
    }
  }

  return { removed: sum, newGame };
};

export const first = (input: string) => {
  const game = parseInput(input);

  const { removed } = removeRollsOfPaper(game);

  return removed;
};

export const expectedFirstSolution = "13";

export const second = (input: string) => {
  let game = parseInput(input);

  let total_removed = 0;

  while (true) {
    const { newGame, removed } = removeRollsOfPaper(game);

    if (!removed) {
      break;
    }

    game = newGame;
    total_removed += removed;
  }

  return total_removed;
};

export const expectedSecondSolution = "43";
