var fs = require("fs");

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
  frontiers.push([fullGridWithData.start, 0]);
  let cameFroms = {};
  cameFroms[
    fullGridWithData.start.x.toString() +
      "-" +
      fullGridWithData.start.y.toString()
  ] = fullGridWithData.start;
  let costFroms = {};
  costFroms[
    fullGridWithData.start.x.toString() +
      "-" +
      fullGridWithData.start.y.toString()
  ] = 0;

  while (frontiers.length > 0) {
    let current = frontiers.pop()[0];

    const neighbors = getNeighbors(current, fullGridWithData.gridCases);
    neighbors.forEach((neighbor) => {
      let newCost =
        costFroms[current.x.toString() + "-" + current.y.toString()] + 1;
      // Check if reached
      let isReached = false;

      for (let camePath in costFroms) {
        let xy = camePath.split("-");
        //console.log(xy);
        if (parseInt(xy[0]) === neighbor.x && parseInt(xy[1]) === neighbor.y) {
          isReached = true;
        }
      }

      let toPush = false;
      if (!isReached) {
        toPush = true;
      } else if (
        newCost < costFroms[neighbor.x.toString() + "-" + neighbor.y.toString()]
      ) {
        toPush = true;
      }
      if (toPush) {
        /*console.log(
          "PUSHED: Reached? ",
          isReached,
          " || NewCost? ",
          newCost,
          " || OldCost? ",
          costFroms[neighbor.x.toString() + "-" + neighbor.y.toString()]
        );*/

        //insert at correct location, lowest prio at last
        let correctPos = 0;
        for (let run = 0; run < frontiers.length; run++) {
          if (frontiers[run][1] > newCost) {
            correctPos++;
          }
        }
        frontiers.splice(correctPos, 0, [neighbor, newCost]);

        costFroms[neighbor.x.toString() + "-" + neighbor.y.toString()] =
          newCost;
        cameFroms[neighbor.x.toString() + "-" + neighbor.y.toString()] =
          current;
      } else {
        //console.log("NOT PUSHED");
      }
      //console.log(cameFroms);
    });
    //console.log(frontiers);
  }
  //console.log(cameFroms);
  return cameFroms;
};

const getNumberMovesWithPath = (paths, start, end) => {
  console.log("Start searching path");
  let current = end;
  let steps = 0;

  let endExist = false;
  for (let camePath in paths) {
    let toFrom = camePath.split("-");
    if (parseInt(toFrom[0]) === end.x && parseInt(toFrom[1]) === end.y) {
      endExist = true;
    }
  }

  if (!endExist) {
    console.log("No goal to reach");
    return 100000;
  }

  while (current.x != start.x || current.y != start.y) {
    steps += 1;

    for (let camePath in paths) {
      //check sur camePath
      let toFrom = camePath.split("-");
      //console.log(toFrom);
      if (
        parseInt(toFrom[0]) === current.x &&
        parseInt(toFrom[1]) === current.y
      ) {
        current = paths[camePath];
        //console.log(current);
      }
    }
  }
  console.log("Path found in ", steps, " steps");
  return steps;
};

const getGrids = () => {
  const inputText = fs.readFileSync("./input.txt").toString();
  const inputParsedBlock = inputText.split("\n");

  let inputParsedGrid = [];
  let possibleStarts = [];
  let goal = new gridCase();
  let grids = [];

  for (let i = 0; i < inputParsedBlock.length; i++) {
    let row = [];
    for (let j = 0; j < inputParsedBlock[i].length; j++) {
      row.push(new gridCase(j, i, parseInt(inputParsedBlock[i][j], 36) - 9));
      if (inputParsedBlock[i][j] === "S") {
        row[j].level = parseInt("a", 36) - 9;
        possibleStarts.push(new gridCase(j, i, parseInt("a", 36) - 9));
      } else if (inputParsedBlock[i][j] === "E") {
        row[j].level = parseInt("z", 36) - 9;
        goal = new gridCase(j, i, parseInt("z", 36) - 9);
      } else if (inputParsedBlock[i][j] === "a") {
        possibleStarts.push(new gridCase(j, i, parseInt("a", 36) - 9));
      }
    }
    inputParsedGrid.push(row);
  }

  possibleStarts.forEach((start) => {
    grids.push(new gridData(inputParsedGrid, start, goal));
  });

  return grids;
};

const getLowestMoves = (moves) => {
  let miniMoves = moves[0];
  for (let i = 1; i < moves.length; i++) {
    if (moves[i] < miniMoves) {
      miniMoves = moves[i];
    }
  }
  return miniMoves;
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

console.log("--- Part 2 ---");
console.log(
  "What is the fewest steps required to move starting from any square with elevation a to the location that should get the best signal?" +
    "\n"
);

const gridsWithData = getGrids();
console.log(
  "There are " + gridsWithData.length + " possible locations to start from"
);
let multiplePaths = [];
let counter = 1;
gridsWithData.forEach((grid) => {
  console.log("Start path ", counter);
  multiplePaths.push(getPaths(grid));
  counter++;
});
let multipleRequiredMoves = [];
for (let i = 0; i < multiplePaths.length; i++) {
  multipleRequiredMoves.push(
    getNumberMovesWithPath(
      multiplePaths[i],
      gridsWithData[i].start,
      gridsWithData[i].goal
    )
  );
}
let miniMoves = getLowestMoves(multipleRequiredMoves);

//Check si on toruve toujours une path to the end, sinon boucle infini dans le get number moves

console.log(
  "The fewest steps required to move starting from any square with elevation a to the location is " +
    miniMoves +
    "\n"
);
