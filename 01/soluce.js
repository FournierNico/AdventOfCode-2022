var fs = require("fs");

const getItemsPerElf = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  //console.log(inputText);

  const inputParsedBlock = inputText.split("\n\n");
  //console.log(inputParsedBlock);

  var inputParsedElfs = [];
  inputParsedBlock.forEach((element) => {
    const elf = element.split("\n");
    inputParsedElfs.push(elf);
  });
  //console.log(inputParsedElfs);

  return inputParsedElfs;
};

const getCaloriesPerElf = (itemsPerElf) => {
  var caloriesPerElf = [];

  itemsPerElf.forEach((element) => {
    const totalColories = element.reduce(
      (accumulator, currentValue) =>
        parseInt(accumulator) + parseInt(currentValue),
      0
    );
    caloriesPerElf.push(totalColories);
  });
  //console.log(caloriesPerElf);

  return caloriesPerElf;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 1: Calorie Counting ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?" +
    "\n"
);

const itemsPerElf = getItemsPerElf();
const caloriesPerElf = getCaloriesPerElf(itemsPerElf);
const maxCalories = Math.max(...caloriesPerElf);

console.log("Max calories carried by an Elf is: " + maxCalories + "\n");

console.log("--- Part 2 ---");
console.log(
  "Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?" +
    "\n"
);

const caloriesPerElfSorted = caloriesPerElf.sort((a, b) => b - a);
const maxCaloriesTop3Elfs = caloriesPerElfSorted
  .slice(0, 3)
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(
  "Calories carried by the 3 top Elfs are: " + maxCaloriesTop3Elfs + "\n"
);
