import { fileToStringArray, replaceInString, multiplyArray } from "./utils.js";

const FILE_PATH = "inputs/03.1.txt";

// xStep/yStep pairs
const SCENARIOS = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const checkForTree = (line, xIndex) => {
  // to simulate repeating along the x-axis, we'll convert the raw index to a modulus
  const modIndex = xIndex % line.length;
  const isTree = line[modIndex] === "#";
  console.log(replaceInString(line, modIndex, isTree ? "X" : "O"));
  return isTree;
};

const processLine = (line, yIndex, xStep, yStep) => {
  // if this line's index is not evenly divisible by yStep, skip it
  if (yIndex % yStep !== 0) {
    console.log(line);
    return false;
  }

  // our xIndex in the product of the number of significant lines and xStep
  const adjustedYIndex = yIndex / yStep;
  const xIndex = adjustedYIndex * xStep;
  return checkForTree(line, xIndex);
};

const run = async () => {
  const inputLines = await fileToStringArray(FILE_PATH);
  const treeHits = SCENARIOS.map(
    ([xStep, yStep]) =>
      inputLines
        .map((line, yIndex) => processLine(line, yIndex, xStep, yStep))
        .filter((x) => x).length
  );

  console.log(treeHits);
  console.log(multiplyArray(treeHits));
};

run();
