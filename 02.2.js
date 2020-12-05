import { fileToStringArray } from "./utils.js";

const FILE_PATH = "inputs/02.2.txt";

const isTree = (line, index) => line[index] === "#";

const validatePassword = ({
  firstPosition,
  secondPosition,
  character,
  password,
}) =>
  (password[firstPosition - 1] === character) ^
  (password[secondPosition - 1] === character);

const run = async () => {
  const inputStrings = await fileToStringArray(FILE_PATH);
  const parsedData = inputStrings.map(parseString);
  const validPasswords = parsedData.filter(validatePassword);
  console.log(validPasswords.length);
};

run();
