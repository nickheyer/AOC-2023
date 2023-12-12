async function partOne() {
  const inputText = `1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`;

  const inputArr = inputText.split('\n');
  const inputDigits = inputArr.map((line) => {
    const first = Array.from(line).find(Number);
    const last = Array.from(line).findLast(Number);
    const total = `${first}${last}`;
    return Number.parseInt(total);
  });
  return inputDigits.reduce((sum, num) => num + sum);
}

async function partTwo() {
  const inputText = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`;

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

      for (const alph in digitMap) {
        const digit = digitMap[alph];
        startLn = startLn.replace(alph, digit);
        endLn = endLn.replace(alph, digit);
      }
      first = first || Array.from(startLn).find(Number);
      last = last || Array.from(endLn).find(Number);
    }
    return Number.parseInt(`${first}${last}`);
  });
  return inputDigits.reduce((sum, num) => num + sum);
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