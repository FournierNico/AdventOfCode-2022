var fs = require("fs");

const getRucksacksContent = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  //console.log(inputText);

  const inputParsedBlock = inputText.split("\n");
  //console.log(inputParsedBlock);

  let inputParsedRuckstacks = [];
  inputParsedBlock.forEach((ruckstack) => {
    const ruckstackSplit = ruckstack.split("");
    inputParsedRuckstacks.push(ruckstackSplit);
  });
  //console.log(inputParsedRuckstacks);

  return inputParsedRuckstacks;
};

const getRuckstacksTwoCompartments = (ruckstacks) => {
  let ruckstacksTwoCompartments = [];
  ruckstacks.forEach((ruckstack) => {
    const firstCompartment = ruckstack.slice(0, ruckstack.length / 2);
    const secondCompartment = ruckstack.slice(ruckstack.length / 2);
    ruckstacksTwoCompartments.push([firstCompartment, secondCompartment]);
  });
  //console.log(ruckstacksTwoCompartments);

  return ruckstacksTwoCompartments;
};

const getRuckstacksGrouped = (ruckstacks) => {
  let ruckstacksGrouped = [];
  for (let i = 0; i < ruckstacks.length; i += 3) {
    ruckstacksGrouped.push(ruckstacks.slice(i, i + 3));
  }
  //console.log(ruckstacksGrouped);

  return ruckstacksGrouped;
};

const getCommonItemTwoCompartments = (ruckstack) => {
  //forEach() cant be stopped
  for (let i = 0; i < ruckstack[0].length; i++) {
    for (let j = 0; j < ruckstack[1].length; j++) {
      if (ruckstack[0][i] === ruckstack[1][j]) {
        return ruckstack[0][i];
      }
    }
  }

  console.log("No common item");
  return "A";
};

const getCommonItemGroups = (ruckstacks) => {
  //Not generic at all - only work with group of 3 - not optimized approach

  for (let i = 0; i < ruckstacks[0].length; i++) {
    for (let j = 0; j < ruckstacks[1].length; j++) {
      if (ruckstacks[0][i] === ruckstacks[1][j]) {
        // Common 1 and 2, check 3
        for (let h = 0; h < ruckstacks[2].length; h++) {
          if (ruckstacks[0][i] === ruckstacks[2][h]) {
            return ruckstacks[0][i];
          }
        }
      }
    }
  }

  console.log("No common item");
  return "A";
};

const mapPriority = (value) => {
  let convertedPriority = parseInt(value, 36) - 9;
  if (value.toUpperCase() && value != value.toLowerCase()) {
    convertedPriority += 26;
  }
  return convertedPriority;
};

const getTotalPriorityScore = (ruckstacks) => {
  let totalPriorityScore = 0;
  ruckstacks.forEach((ruckstack) => {
    totalPriorityScore += mapPriority(getCommonItemTwoCompartments(ruckstack));
  });

  return totalPriorityScore;
};

const getTotalGroupsPrirorityScore = (groupedRuckstacks) => {
  let totalGroupsPrirorityScore = 0;
  groupedRuckstacks.forEach((group) => {
    totalGroupsPrirorityScore += mapPriority(getCommonItemGroups(group));
  });

  return totalGroupsPrirorityScore;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 3: Rucksack Reorganization ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?" +
    "\n"
);

const ruckstacksContent = getRucksacksContent();
const ruckstacksTwoCompartments =
  getRuckstacksTwoCompartments(ruckstacksContent);
const totalPriorityScore = getTotalPriorityScore(ruckstacksTwoCompartments);

console.log(
  "The sum of the priorities of those item types is " +
    totalPriorityScore +
    "\n"
);

console.log("--- Part 2 ---");
console.log(
  "Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?" +
    "\n"
);

const ruckstacksGrouped = getRuckstacksGrouped(ruckstacksContent);
const totalGroupsPrirorityScore =
  getTotalGroupsPrirorityScore(ruckstacksGrouped);

console.log(
  "The sum of the priorities of those item types is " +
    totalGroupsPrirorityScore +
    "\n"
);
