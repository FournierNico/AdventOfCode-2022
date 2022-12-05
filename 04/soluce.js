var fs = require("fs");

const getAssignmentPairs = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  //console.log(inputText);

  const inputParsedBlock = inputText.split("\n");
  //console.log(inputParsedBlock);

  let inputParsedPairs = [];
  inputParsedBlock.forEach((block) => {
    const pair = block.split(",");
    inputParsedPairs.push(pair);
  });
  //console.log(inputParsedPairs);

  return inputParsedPairs;
};

const convertAssignementPairs = (assignmentPairs) => {
  let convertedAssignementPairs = [];
  assignmentPairs.forEach((pairs) => {
    let convertedPair = [];

    let firstFullIDs = "";
    const ffirstEntry = parseInt(pairs[0].split("-")[0]);
    const flastEntry = parseInt(pairs[0].split("-")[1]);
    for (let i = ffirstEntry; i <= flastEntry; i++) {
      firstFullIDs += "," + i + ",";
    }

    convertedPair.push(firstFullIDs);

    let secondFullIDs = "";
    const sfirstEntry = parseInt(pairs[1].split("-")[0]);
    const slastEntry = parseInt(pairs[1].split("-")[1]);
    for (let i = sfirstEntry; i <= slastEntry; i++) {
      secondFullIDs += "," + i + ",";
    }

    convertedPair.push(secondFullIDs);

    convertedAssignementPairs.push(convertedPair);
  });
  //console.log(convertedAssignementPairs);

  return convertedAssignementPairs;
};

const getFullyContained = (assignmentPairs) => {
  let containCounter = 0;
  assignmentPairs.forEach((pair) => {
    if (pair[0].includes(pair[1])) {
      containCounter++;
    } else if (pair[1].includes(pair[0])) {
      containCounter++;
    }
  });
  return containCounter;
};

const convertAssignementPairsInArray = (assignmentPairs) => {
  let convertedAssignementPairsArray = [];
  assignmentPairs.forEach((pairs) => {
    let convertedPair = [];

    let firstFullIDs = [];
    const ffirstEntry = parseInt(pairs[0].split("-")[0]);
    const flastEntry = parseInt(pairs[0].split("-")[1]);
    for (let i = ffirstEntry; i <= flastEntry; i++) {
      firstFullIDs.push(i);
    }

    convertedPair.push(firstFullIDs);

    let secondFullIDs = [];
    const sfirstEntry = parseInt(pairs[1].split("-")[0]);
    const slastEntry = parseInt(pairs[1].split("-")[1]);
    for (let i = sfirstEntry; i <= slastEntry; i++) {
      secondFullIDs.push(i);
    }

    convertedPair.push(secondFullIDs);

    convertedAssignementPairsArray.push(convertedPair);
  });
  //console.log(convertedAssignementPairsArray);

  return convertedAssignementPairsArray;
};

const getOverlap = (assignmentPairs) => {
  let overlapCounter = 0;
  assignmentPairs.forEach((pair) => {
    if (pair[0].some((r) => pair[1].includes(r))) {
      overlapCounter++;
    } else if (pair[1].some((r) => pair[0].includes(r))) {
      overlapCounter++;
    }
  });
  return overlapCounter;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 4: Camp Cleanup ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "In how many assignment pairs does one range fully contain the other?" + "\n"
);

const assignmentPairs = getAssignmentPairs();
const convertedAssignementPairs = convertAssignementPairs(assignmentPairs);
const assignmentPairsFullyContained = getFullyContained(
  convertedAssignementPairs
);

console.log(
  "One range fully contain the other in " +
    assignmentPairsFullyContained +
    " assignment pairs" +
    "\n"
);

console.log("--- Part 2 ---");
console.log("In how many assignment pairs do the ranges overlap? " + "\n");

const convertedAssignementPairsinArray =
  convertAssignementPairsInArray(assignmentPairs);
const assignmentPairsOverlap = getOverlap(convertedAssignementPairsinArray);

console.log(
  "The ranges overlap in " + assignmentPairsOverlap + " assignment pairs" + "\n"
);
