var fs = require("fs");

const getCommands = () => {
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

function item(
  level = -1,
  parents = [],
  type = "null",
  name = "null",
  size = -1
) {
  this.level = level;
  this.parents = parents;
  this.type = type;
  this.name = name;
  this.size = size;
}

// Working only because exploring deep first?
const buildTree = (commands) => {
  let tree = [];
  let currentLevel = -1;
  let currentParentTree = [];
  commands.forEach((cmd) => {
    if (cmd[0] === "$") {
      if (cmd[1] === "cd") {
        if (cmd[2] === "..") {
          currentLevel -= 1;
        } else if (cmd[2] === "/") {
          currentLevel = 0;
          currentParentTree[currentLevel] = ["/"];
        } else {
          currentLevel += 1;
          currentParentTree[currentLevel] = [
            ...currentParentTree[currentLevel - 1],
            cmd[2],
          ];
        }
      } else {
        // $ ls -> nothing to do
      }
    } else {
      if (cmd[0] !== "dir") {
        const element = new item(
          currentLevel,
          currentParentTree[currentLevel],
          "file",
          cmd[1],
          parseInt(cmd[0])
        );
        if (!tree[currentLevel]) {
          tree[currentLevel] = [];
        }
        tree[currentLevel] = [...tree[currentLevel], element];
      } else {
        const element = new item(
          currentLevel,
          currentParentTree[currentLevel],
          "dir",
          cmd[1],
          -1
        );
        //tree.push(element);
        if (!tree[currentLevel]) {
          tree[currentLevel] = [];
        }
        tree[currentLevel] = [...tree[currentLevel], element];
      }
    }
  });
  //console.log(tree[0]);

  return tree;
};

const calcultateDirsSize = (tree) => {
  for (let i = tree.length - 1; i >= 0; i--) {
    tree[i].forEach((element) => {
      if (element.type === "dir" && element.size === -1) {
        element.size = getDirSize(tree.slice(i + 1), [
          ...element.parents,
          element.name,
        ]);
      }
    });
  }
};

const getDirSize = (tree, parents) => {
  let levelSize = 0;
  for (let j = 0; j < tree[0].length; j++) {
    if (JSON.stringify(tree[0][j].parents) === JSON.stringify(parents)) {
      if (tree[0][j].type === "dir" && tree[0][j].size === -1) {
        levelSize += getDirSize(tree.slice(1), [
          ...tree[0][j].parents,
          ...tree[0][j].name,
        ]);
      } else {
        levelSize += tree[0][j].size;
      }
    }
  }
  //console.log("The tree is ", tree);
  //console.log("Return for ", parents, " a size of ", levelSize);
  return levelSize;
};

const getTotalSizeDirsMaxSize = (tree, maxSize) => {
  let sumDirs = 0;
  tree.forEach((level) => {
    level.forEach((element) => {
      if (element.type === "dir" && element.size <= maxSize) {
        sumDirs += element.size;
      }
    });
  });
  return sumDirs;
};

const calculateToFreeUpSpace = (tree, fileSystemSize, expectedFreeSpace) => {
  let usedSpace = 0;
  tree[0].forEach((element) => {
    usedSpace += element.size;
  });

  const unusedSpace = fileSystemSize - usedSpace;

  return expectedFreeSpace - unusedSpace;
};

const getDirToDelete = (tree, spaceToFree) => {
  let usedSpace = 0;
  tree[0].forEach((element) => {
    usedSpace += element.size;
  });

  let dirToDelete = new item(-1, [""], "dir", "/", usedSpace);

  for (let i = 0; i < tree.length; i++) {
    tree[i].forEach((element) => {
      if (element.type === "dir") {
        if (element.size >= spaceToFree && element.size <= dirToDelete.size) {
          dirToDelete = element;
        }
      }
    });
  }

  return dirToDelete;
};

/* -- Exec. -- */

console.log("\n" + "--- Advent of Code 2022 ---");
console.log("--- Day 7: No Space Left On Device ---" + "\n");

console.log("--- Part 1 ---");
console.log(
  "Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?" +
    "\n"
);

const cmds = getCommands();
const tree = buildTree(cmds);
calcultateDirsSize(tree);
const totalSizeDirsMax100000 = getTotalSizeDirsMaxSize(tree, 100000);

console.log(
  "The sum of the total sizes of the directories with a total size of at most 100000 is " +
    totalSizeDirsMax100000 +
    "\n"
);

console.log("--- Part 2 ---");
console.log(
  "Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?" +
    "\n"
);

const spaceToFree = calculateToFreeUpSpace(tree, 70000000, 30000000);
const dirToDelete = getDirToDelete(tree, spaceToFree);

console.log(
  "The dir to delete is " +
    dirToDelete.parents.toString() +
    "," +
    dirToDelete.name +
    " with a size of " +
    dirToDelete.size +
    "\n"
);
