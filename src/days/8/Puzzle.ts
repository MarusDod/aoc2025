import {
  add,
  multiply,
  removeArrayIndexes,
  unique,
  zip,
} from "../../utils/fp.ts";

type Coordinate = [number, number, number];

const euclidianDistance = (x: Coordinate, y: Coordinate): number =>
  Math.sqrt(add(...zip(x, y).map(([a, b]) => (a - b) ** 2)));

const belongsToCircuit = (x: Coordinate, circuit: Coordinate[]) =>
  circuit.some((c) => euclidianDistance(c, x) === 0);

const parseInput = (input: string): Coordinate[] =>
  input
    .split("\n")
    .filter(Boolean)
    .map((i) => i.split(",").map(Number) as Coordinate);

const getDistances = (coords: Coordinate[]) =>
  unique(
    coords
      .flatMap((firstCoord, i) =>
        coords.map((secondCoord, j) => {
          const distance = euclidianDistance(firstCoord, secondCoord);

          if (distance === 0) {
            return null;
          }

          return { distance, i, j };
        })
      )
      .filter((x) => x !== null),
    (x) => x!.distance
  ).toSorted((x, y) => x!.distance - y!.distance);

const linkCoordinates = (
  circuits: Coordinate[][],
  x: Coordinate,
  y: Coordinate
) => {
  const firstCircuitIndex = circuits.findIndex((c) => belongsToCircuit(x, c));

  const secondCircuitIndex = circuits.findIndex((c) => belongsToCircuit(y, c));

  if (firstCircuitIndex === secondCircuitIndex) {
    return circuits;
  }

  const firstCircuit = circuits[firstCircuitIndex];

  const secondCircuit = circuits[secondCircuitIndex];

  return [
    firstCircuit.concat(secondCircuit),
    ...removeArrayIndexes(circuits, [firstCircuitIndex, secondCircuitIndex]),
  ];
};

export const first = (input: string, test: boolean) => {
  const coords = parseInput(input);

  const nCircuits = test ? 10 : 1000;

  let circuits: Coordinate[][] = coords.map((c) => [c]);

  const distances = getDistances(coords).slice(0, nCircuits)!;

  distances.forEach((d) => {
    circuits = linkCoordinates(circuits, coords[d.i], coords[d.j]);
  });

  return multiply(
    ...circuits
      .map((c) => c.length)
      .toSorted((x, y) => y - x)
      .slice(0, 3)
  );
};

export const expectedFirstSolution = "40";

export const second = (input: string) => {
  const coords = parseInput(input);

  const distances = getDistances(coords);

  let circuits: Coordinate[][] = coords.map((c) => [c]);

  for (const { i, j } of distances) {
    circuits = linkCoordinates(circuits, coords[i], coords[j]);

    if (circuits.length === 1) {
      return coords[i][0] * coords[j][0];
    }
  }

  throw new Error("wtf dude");
};

export const expectedSecondSolution = 25272;
