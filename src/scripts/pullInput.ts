import "dotenv/config";
import { writeFileSync } from "node:fs";

async function main() {
  const args = process.argv.slice(2);
  const year = args[0];
  const day = args[1];

  if (!day || !year) {
    console.log(
      "Please run with the year and day to bootstrap, i.e. npm run pull 2025 1"
    );

    process.exit(1);
  }

  if (!process.env.AOC_SESSION) {
    console.error("needs AOC_SESSION env variable");
    process.exit(1);
  }

  console.log(`pulling input for day ${day}...`);
  const basePath = "src/days";

  const newDayPath = `${basePath}/${day}`;

  const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      Cookie: `session=${process.env.AOC_SESSION}`,
    },
  });

  const text = await res.text();

  writeFileSync(`${newDayPath}/input.txt`, text);
}

main();
