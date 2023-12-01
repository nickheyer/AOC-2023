const fs = require('fs').promises;
const dedent = require('dedent');
const _ = require('lodash');

async function getInput(sample) {
  const sampleText = dedent`
  two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen
  `;

  if (sample) {
    return sampleText;
  }

  return await fs.readFile(`${__dirname}/input.txt`, 'utf-8');
}

async function partOne(sample = false) {
  const inputText = await getInput(sample);
  const inputArr = inputText.split('\n');
  const inputDigits = inputArr.map((line) => {
    const first = _.find(line, Number);
    const last = _.findLast(line, Number);
    return _.toInteger(`${first}${last}`);
  });
  return _.sum(inputDigits);
}

async function partTwo(sample = false) {
  const inputText = await getInput(sample);
  const inputArr = inputText.split('\n');
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
  const inputDigits = inputArr.map((line) => {
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
  try {
    const partOneAnswer = await partOne();
    const partTwoAnswer = await partTwo();

    return `The answer for part one is:\n${partOneAnswer}\n\nThe answer for part two is:\n${partTwoAnswer}`;
  } catch (err) {
    return `Encountered an error while chasing after the advent of code elves...:\n${err}`;
  }
}

main()
.then(stdout => console.log(stdout));