const fs = require('fs').promises;
const _ = require('lodash');


function parseInput(text) {
  const splitText = text
    .trim()
    .split('\n');
  return splitText.map((row) => {
    const [, cardNums] = row.split(':');
    return _.map(
      cardNums.split('|'),
      (c) => c.split(' ').filter(Boolean)
    );
  })
}

async function getInput(sample) {
  const sampleText =
    `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

  if (sample) {
    return parseInput(sampleText);
  }

  const inputFile = await fs.readFile(
    `${__dirname}/input.txt`,
    'utf-8'
  );

  return parseInput(inputFile);
}

function findWinners(cards) {
  return cards.map((card, i) => {
    const winnerNums = _.intersection(card[0], card[1]);
    return _.reduce(
      winnerNums,
      (points) => points > 0 ? points * 2 : 1,
      0
    );
  });
}

async function partOne(input) {
  const winners = findWinners(input);
  return _.sum(winners);
}

async function partTwo(input) {
  const winners = findWinners(input);
  return _.sum(winners);

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
.then((stdout) => console.log(stdout))
.catch((stderr) => console.error(stderr));