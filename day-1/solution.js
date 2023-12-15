const fs = require('fs').promises;
const _ = require('lodash');



function parseInput(text) {
  return text.split('\n');
}

async function getInput(sample) {
  const sampleText =
    `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`;

  if (sample) {
    return parseInput(sampleText)
  }

  const inputFile = await fs.readFile(
    `${__dirname}/input.txt`,
    'utf-8'
  );

  return parseInput(inputFile);
}

async function partOne(input) {
  const inputDigits = input.map((line) => {
    const first = _.find(line, Number);
    const last = _.findLast(line, Number);
    return _.toInteger(`${first}${last}`);
  });
  return _.sum(inputDigits);
}

async function partTwo(input) {
  const digitMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  };
  const inputDigits = input.map((line) => {
    let [x, y] = [0, line.length - 1];
    let first, last;
    while (x < line.length && (!first || !last)) {
      let startLn = line.slice(0, ++x);
      let endLn = line.slice(y--);
      _.forIn(digitMap, (digit, alph) => {
        startLn = startLn.replace(alph, digit);
        endLn = endLn.replace(alph, digit);
      })
      first = first || _.find(startLn, Number);
      last = last || _.find(endLn, Number);
    }
    return _.toInteger(`${first}${last}`);
  });
  return _.sum(inputDigits);
}

async function main() {
  const promptInput = await getInput(true);
  const partOneAnswer = await partOne(promptInput);
  const partTwoAnswer = await partTwo(promptInput);
  return `
  The answer for part one is:
  ${partOneAnswer}
  The answer for part two is:
  ${partTwoAnswer}`;
}

main()
.then(console.log)
.catch(console.error);