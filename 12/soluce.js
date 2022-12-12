var fs = require("fs");
const path = require("path");

function gridCase(x = -1, y = -1, level = -1) {
  this.x = x;
  this.y = y;
  this.level = level;
}

function gridData(
  gridCases = [],
  start = new gridCase(),
  goal = new gridCase()
) {
  this.gridCases = gridCases;
  this.start = start;
  this.goal = goal;
}

const getGrid = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  //console.log(inputText);

  const inputParsedBlock = inputText.split("\n");
  //console.log(inputParsedBlock);

  let inputParsedGrid = [];
  let start = new gridCase();
  let goal = new gridCase();
  let grid = new gridData();

  for (let i = 0; i < inputParsedBlock.length; i++) {
    let row = [];
    for (let j = 0; j < inputParsedBlock[i].length; j++) {
      row.push(new gridCase(j, i, parseInt(inputParsedBlock[i][j], 36) - 9));
      if (inputParsedBlock[i][j] === "S") {
        row[j].level = parseInt("a", 36) - 9;
        start = new gridCase(j, i, parseInt("a", 36) - 9);
      } else if (inputParsedBlock[i][j] === "E") {
        row[j].level = parseInt("z", 36) - 9;
        goal = new gridCase(j, i, parseInt("z", 36) - 9);
      }
    }
    inputParsedGrid.push(row);
  }

  grid = new gridData(inputParsedGrid, start, goal);
  //console.log(grid.gridCases);

  return grid;
};

const getNeighbors = (caseToCheck, fullGrid) => {
  let visitableNeighbors = [];
  // Testing top
  if (
    caseToCheck.y > 0 &&
    fullGrid[caseToCheck.y - 1][caseToCheck.x].level <= caseToCheck.level + 1
  ) {
    visitableNeighbors.push(
      new gridCase(
        fullGrid[caseToCheck.y - 1][caseToCheck.x].x,
        fullGrid[caseToCheck.y - 1][caseToCheck.x].y,
        fullGrid[caseToCheck.y - 1][caseToCheck.x].level
      )
    );
  }
  // Testing bot
  if (
    caseToCheck.y < fullGrid.length - 1 &&
    fullGrid[caseToCheck.y + 1][caseToCheck.x].level <= caseToCheck.level + 1
  ) {
    visitableNeighbors.push(
      new gridCase(
        fullGrid[caseToCheck.y + 1][caseToCheck.x].x,
        fullGrid[caseToCheck.y + 1][caseToCheck.x].y,
        fullGrid[caseToCheck.y + 1][caseToCheck.x].level
      )
    );
  }
  // Testing left
  if (
    caseToCheck.x > 0 &&
    fullGrid[caseToCheck.y][caseToCheck.x - 1].level <= caseToCheck.level + 1
  ) {
    visitableNeighbors.push(
      new gridCase(
        fullGrid[caseToCheck.y][caseToCheck.x - 1].x,
        fullGrid[caseToCheck.y][caseToCheck.x - 1].y,
        fullGrid[caseToCheck.y][caseToCheck.x - 1].level
      )
    );
  }
  // Testing right
  if (
    caseToCheck.x < fullGrid[caseToCheck.y].length - 1 &&
    fullGrid[caseToCheck.y][caseToCheck.x + 1].level <= caseToCheck.level + 1
  ) {
    visitableNeighbors.push(
      new gridCase(
        fullGrid[caseToCheck.y][caseToCheck.x + 1].x,
        fullGrid[caseToCheck.y][caseToCheck.x + 1].y,
        fullGrid[caseToCheck.y][caseToCheck.x + 1].level
      )
    );
  }
  return visitableNeighbors;
};

const getPaths = (fullGridWithData) => {
  let frontiers = [];
  frontiers.push(fullGridWithData.start);
  let reacheds = [];
  reacheds.push(fullGridWithData.start);
  let cameFroms = [];

  while (frontiers.length > 0) {
    let current = frontiers.pop();
    const neighbors = getNeighbors(current, fullGridWithData.gridCases);
    neighbors.forEach((neighbor) => {
      // Check if reached
      let isReached = false;
      reacheds.forEach((alreadyReached) => {
        if (
          alreadyReached.x === neighbor.x &&
          alreadyReached.y === neighbor.y
        ) {
          isReached = true;
        }
      });
      if (!isReached) {
        frontiers.push(neighbor);
        reacheds.push(neighbor);
        cameFroms.push([neighbor, current]);
      }
    });
  }
  //console.log(cameFroms);
  return cameFroms;
};

const getNumberMovesWithPath = (paths, start, end) => {
  let current = end;
  let steps = 0;
  while (current.x != start.x || current.y != start.y) {
    steps += 1;
    paths.forEach((toFrom) => {
      if (toFrom[0].x === current.x && toFrom[0].y === current.y) {
        current = toFrom[1];
        console.log(current);
      }
    });
  }
  return steps;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 12: Hill Climbing Algorithm ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "What is the fewest steps required to move from your current position to the location that should get the best signal?" +
    "\n"
);

const gridWithData = getGrid();
const paths = getPaths(gridWithData);
const requiredMoves = getNumberMovesWithPath(
  paths,
  gridWithData.start,
  gridWithData.goal
);

console.log(
  "The fewest steps required to move from your current position to the location is " +
    requiredMoves +
    "\n"
);
