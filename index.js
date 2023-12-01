const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

userInput.question('Enter the day number to run: ', (day) => {
  const dayDir = `day-${day}`;
  const scriptPath = `./${dayDir}/solution.js`;

  if (fs.existsSync(dayDir) && fs.existsSync(scriptPath)) {
    exec(
      `node ${scriptPath}`,
      (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(stdout);
      console.error(stderr);
      }
    );
  } else {
    console.log(`Day ${day} does not exist or missing solution.js`);
  }

  userInput.close();
});
