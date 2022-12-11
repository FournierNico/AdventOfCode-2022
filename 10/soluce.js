var fs = require("fs");

const getProgramm = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  //console.log(inputText);

  const inputParsedBlock = inputText.split("\n");
  //console.log(inputParsedBlock);

  let inputParsedCmds = [];
  inputParsedBlock.forEach((cmd) => {
    const cmdsSplit = cmd.split(" ");
    inputParsedCmds.push(cmdsSplit);
  });
  //console.log(inputParsedCmds);

  return inputParsedCmds;
};

const getCyclesFromProgramm = (programm) => {
  let cycles = [];
  let X = 1;
  programm.forEach((cmd) => {
    if (cmd[0] === "noop") {
      cycles.push(X);
    } else if (cmd[0] === "addx") {
      cycles.push(X);
      X += parseInt(cmd[1]);
      cycles.push(X);
    }
  });

  //console.log(cycles);
  return cycles;
};

const getStrengthFromCycles = (cycles) => {
  let strength = 0;
  strength += cycles[18] * 20;
  strength += cycles[58] * 60;
  strength += cycles[98] * 100;
  strength += cycles[138] * 140;
  strength += cycles[178] * 180;
  strength += cycles[218] * 220;

  /*console.log(cycles[18]);
  console.log(cycles[58]);
  console.log(cycles[98]);
  console.log(cycles[138]);
  console.log(cycles[178]);
  console.log(cycles[218]);*/

  return strength;
};

const getPixel = (posCRT, posX) => {
  if (posCRT === posX - 1 || posCRT === posX || posCRT === posX + 1) {
    return "#";
  } else {
    return ".";
  }
};

const drawFromCycles = (cycles) => {
  let screen = "#";
  for (let i = 1; i < 40; i++) {
    screen += getPixel(i, cycles[i - 1]);
  }
  screen += "\n";
  for (let i = 40; i < 80; i++) {
    screen += getPixel(i - 40, cycles[i - 1]);
  }
  screen += "\n";
  for (let i = 80; i < 120; i++) {
    screen += getPixel(i - 80, cycles[i - 1]);
  }
  screen += "\n";
  for (let i = 120; i < 160; i++) {
    screen += getPixel(i - 120, cycles[i - 1]);
  }
  screen += "\n";
  for (let i = 160; i < 200; i++) {
    screen += getPixel(i - 160, cycles[i - 1]);
  }
  screen += "\n";
  for (let i = 200; i < 240; i++) {
    screen += getPixel(i - 200, cycles[i - 1]);
  }

  console.log(screen);
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 10: Cathode-Ray Tube ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?" +
    "\n"
);

const cmds = getProgramm();
const cycles = getCyclesFromProgramm(cmds);
const sumStrengths = getStrengthFromCycles(cycles);

console.log("The sum of these six signal strengths is " + sumStrengths + "\n");

console.log("--- Part 2 ---");
console.log(
  "Render the image given by your program. What eight capital letters appear on your CRT?" +
    "\n"
);

drawFromCycles(cycles);
