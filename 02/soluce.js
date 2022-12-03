var fs = require("fs");

const getHandsPlayed = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  //console.log(inputText);

  const inputParsedBlock = inputText.split("\n");
  //console.log(inputParsedBlock);

  let inputParsedHands = [];
  inputParsedBlock.forEach((element) => {
    const hand = element.split(" ");
    inputParsedHands.push(hand);
  });
  //console.log(inputParsedHands);

  return inputParsedHands;
};

/*
  Rock [Rock, Paper, Scissors]
  Paper [...]
  Scissors [...]

  1 rock played, 2 paper played, 3 scissors played
  0 lost, 3 draw, 6 win
*/
const pointsMap = [
  [4, 8, 3],
  [1, 5, 9],
  [7, 2, 6],
];

const convertInputPlayed = (input) => {
  if (input === "A" || input === "X") {
    return 0;
  } else if (input === "B" || input === "Y") {
    return 1;
  } else if (input === "C" || input === "Z") {
    return 2;
  } else {
    console.log("Unexpected input during conversion");
    return 0;
  }
};

const getScorePlayed = (hands) => {
  let totalScore = 0;
  hands.forEach((element) => {
    totalScore +=
      pointsMap[convertInputPlayed(element[0])][convertInputPlayed(element[1])];
  });
  return totalScore;
};

const toPlayMap = [
  ["Z", "X", "Y"],
  ["X", "Y", "Z"],
  ["Y", "Z", "X"],
];

const convertInputToPlay = (input) => {
  let expectedResult = 0;
  if (input[1] === "X") {
    expectedResult = 0;
  } else if (input[1] === "Y") {
    expectedResult = 1;
  } else if (input[1] === "Z") {
    expectedResult = 2;
  } else {
    console.log("Unexpected input during conversion input to play");
    expectedResult = 0;
  }
  switch (input[0]) {
    case "A":
      return toPlayMap[expectedResult][0];
    case "B":
      return toPlayMap[expectedResult][1];
    case "C":
      return toPlayMap[expectedResult][2];
  }
};

const convertHandsPlayed = (hands) => {
  let convertedHands = [];
  hands.forEach((hand) => {
    convertedHands.push([hand[0], convertInputToPlay(hand)]);
  });
  return convertedHands;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 2: Rock Paper Scissors ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "What would your total score be if everything goes exactly according to your strategy guide?" +
    "\n"
);

const handsPlayed = getHandsPlayed();
const totalScoreWithStrategy = getScorePlayed(handsPlayed);

console.log(
  "The total score by following the strategy guide is: " +
    totalScoreWithStrategy +
    "\n"
);

console.log("--- Part 2 ---");
console.log(
  "Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?" +
    "\n"
);

const realHandsPlayed = convertHandsPlayed(handsPlayed);
const totalScoreWithRealStrategy = getScorePlayed(realHandsPlayed);

console.log(
  "The total score by following the REAL strategy guide is: " +
    totalScoreWithRealStrategy +
    "\n"
);
