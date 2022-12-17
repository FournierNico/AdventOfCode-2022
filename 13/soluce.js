var fs = require("fs");

const getInput = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  const groups = inputText.split("\n\n");

  const pairsObject = groups.map((pair) => {
    const [left, right] = pair.split("\n").map((line) => JSON.parse(line));
    return { left, right };
  });
  //console.log(pairsObject);

  return pairsObject;
};

const checkOrderisCorrect = (left, right) => {
  const isLeftANumber = typeof left === "number";
  const isRightANumber = typeof right === "number";

  if (isLeftANumber && isRightANumber) {
    if (left < right) {
      return true;
    } else if (left > right) {
      return false;
    } else {
      return null;
    }
  } else if (!isLeftANumber && !isRightANumber) {
    let pos = 0;
    while (true) {
      if (pos > left.length - 1 && pos <= right.length - 1) {
        return true;
      } else if (pos <= left.length - 1 && pos > right.length - 1) {
        return false;
      } else if (pos > left.length - 1 && pos > right.length - 1) {
        return null;
      }

      const compare = checkOrderisCorrect(left[pos], right[pos]);
      if (compare != null) {
        return compare;
      } else {
        pos++;
      }
    }
  } else if (isLeftANumber) {
    return checkOrderisCorrect([left], right);
  } else {
    return checkOrderisCorrect(left, [right]);
  }
};

const getSumPairsRight = (pairsObject) => {
  let sum = 0;
  pairsObject.forEach((pair, i) => {
    if (checkOrderisCorrect(pair.left, pair.right)) {
      sum += i + 1;
    }
  });
  return sum;
};

const getOrderedPairsWD = (pairsObject) => {
  let orderedPairs = [];

  orderedPairs.push([[2]]);
  orderedPairs.push([[6]]);

  let index = 0;
  for (index; index < pairsObject.length; index++) {
    let foundL = false;
    let foundR = false;
    for (i = 0; i < orderedPairs.length; i++) {
      if (!checkOrderisCorrect(orderedPairs[i], pairsObject[index].left)) {
        orderedPairs.splice(i, 0, pairsObject[index].left);
        foundL = true;
        break;
      }
    }
    if (!foundL) {
      orderedPairs.push(pairsObject[index].left);
    }

    for (i = 0; i < orderedPairs.length; i++) {
      if (!checkOrderisCorrect(orderedPairs[i], pairsObject[index].right)) {
        orderedPairs.splice(i, 0, pairsObject[index].right);
        foundR = true;
        break;
      }
    }
    if (!foundR) {
      orderedPairs.push(pairsObject[index].right);
    }
  }

  //console.log(orderedPairs);
  return orderedPairs;
};

const getDividerPos = (orderedPairsWD) => {
  let indexD1 = 0;
  let indexD2 = 0;
  let index = 0;

  while (indexD1 * indexD2 === 0) {
    if (JSON.stringify(orderedPairsWD[index]) === "[[2]]") {
      indexD1 = index + 1;
    }
    if (JSON.stringify(orderedPairsWD[index]) === "[[6]]") {
      indexD2 = index + 1;
    }

    index++;
  }

  return indexD1 * indexD2;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 13:Distress Signal ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "Determine which pairs of packets are already in the right order. What is the sum of the indices of those pairs?" +
    "\n"
);

const pairsObject = getInput();
const sumPairs = getSumPairsRight(pairsObject);

console.log("The sum of the indices of those pairs is " + sumPairs + "\n");

console.log("--- Part 2 ---");
console.log(
  "Organize all of the packets into the correct order. What is the decoder key for the distress signal?" +
    "\n"
);

const orderedPairsWD = getOrderedPairsWD(pairsObject);
const dividerPos = getDividerPos(orderedPairsWD);

console.log("The decoder key for the distress signal is " + dividerPos + "\n");
