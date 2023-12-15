const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');

const supportedLanguages = {
  '.js': 'node',
  '.py': 'python',
  '.rs': 'rustc',
  '.sh': 'bash'
};

function runDay(day) {
  const dayDir = `day-${day}`;
  
  if (fs.existsSync(dayDir)) {
    const files = fs.readdirSync(dayDir);
    const solutionFile = files.find(file => Object.keys(supportedLanguages).includes(file.slice(-3)));

    if (solutionFile) {
      const languageKey = solutionFile.slice(-3);
      const execCommand = supportedLanguages[languageKey];
      let commandToExecute = `${execCommand} ${__dirname}/${dayDir}/${solutionFile}`;

      // Special handling for Rust
      if (languageKey === '.rs') {
        const executableName = solutionFile.replace('.rs', '');
        commandToExecute = `${__dirname}/${dayDir}/${executableName}`;
      }

      exec(commandToExecute, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(stdout);
        console.error(stderr);
      });
    } else {
      console.log(`No supported solution file found in day ${day}`);
    }
  } else {
    console.log(`Day ${day} directory does not exist`);
  }
}


if (process.argv.length > 2) {
  runDay(process.argv[2]);
} else {
  const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  userInput.question('Enter the day number to run: ', (day) => {
    runDay(day);
    userInput.close();
  });
}