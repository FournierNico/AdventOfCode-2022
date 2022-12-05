var fs = require("fs");

const getCreates = () => {
  const inputText = fs.readFileSync("./inputCrates.txt").toString();
  //console.log(inputText);

  const inputParsedBlock = inputText.split("\n");
  //console.log(inputParsedBlock);

  let inputParsedReversedCrates = Array.from(Array(9), () => [...[]]);

  for (let i = inputParsedBlock.length - 1; i >= 0; i--) {
    let pos = 0;
    for (let j = 1; j < inputParsedBlock[i].length; j += 4) {
      if (inputParsedBlock[i][j] != " ") {
        inputParsedReversedCrates[pos].push(inputParsedBlock[i][j]);
      }
      pos += 1;
    }
  }
  //console.log(inputParsedReversedCrates);

  return inputParsedReversedCrates;
};

const getInstructions = () => {
  const inputText = fs.readFileSync("./inputInstructions.txt").toString();
  //console.log(inputText);

  const inputParsedBlock = inputText.split("\n");
  //console.log(inputParsedBlock);

  let inputParsedInstructions = [];
  inputParsedBlock.forEach((instruction) => {
    const cleaned = instruction.replace(/move|from|to/g, "").trimStart();
    const splited = cleaned.split("  ");
    inputParsedInstructions.push(splited);
  });
  //console.log(inputParsedInstructions);

  return inputParsedInstructions;
};

const moveCrates = (crates, instructions) => {
  let movedCrates = [...crates]; //Not working, multi-dim array = ref copy at lvl 2

  instructions.forEach((instruction) => {
    for (let i = 1; i <= instruction[0]; i++) {
      const movedCrate = movedCrates[instruction[1] - 1].pop();
      movedCrates[instruction[2] - 1].push(movedCrate);
    }
  });
  //console.log(movedCrates);
  return movedCrates;
};

const moveCrates9001 = (crates, instructions) => {
  let movedCrates = [...crates];

  instructions.forEach((instruction) => {
    const movedStack = movedCrates[instruction[1] - 1].splice(
      movedCrates[instruction[1] - 1].length - instruction[0],
      instruction[0]
    );

    movedStack.forEach((crate) => {
      movedCrates[instruction[2] - 1].push(crate);
    });
    //console.log(movedCrates);
  });
  return movedCrates;
};

const getCratesOnTop = (crates) => {
  let cratesOnTop = "";
  crates.forEach((col) => {
    cratesOnTop += col[col.length - 1];
  });
  return cratesOnTop;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 5: Supply Stacks ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "After the rearrangement procedure completes, what crate ends up on top of each stack?" +
    "\n"
);

const crates = getCreates();
const intructions = getInstructions();
const movedCrates = moveCrates(crates, intructions);
const cratesOnTop = getCratesOnTop(movedCrates);

console.log(
  "After the rearrangement, the creates on top are " + cratesOnTop + "\n"
);

console.log("--- Part 2 ---");
console.log(
  "Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. After the rearrangement procedure completes, what crate ends up on top of each stack?" +
    "\n"
);

const movedCrates9001 = moveCrates9001(getCreates(), intructions);
const cratesOnTop9001 = getCratesOnTop(movedCrates9001);

console.log(
  "After the rearrangement, the creates on top are " + cratesOnTop9001 + "\n"
);
