const fs = require("fs");
const readline = require("readline");

const FILE_PATH = "inputs/02.txt";

const fileToStringArray = async (filePath) => {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let response = [];
  for await (const line of rl) {
    response.push(line);
  }
  return response;
};

const parseString = (inputString = "") => {
  // replace all separators with a spaces
  const cleanString = inputString.replace(":", "").replace("-", " ");
  const [min, max, character, password] = cleanString.split` `;
  return { min, max, character, password };
};

const validatePassword = ({ min, max, character, password }) => {
  const regex = new RegExp(character, "g");
  const match = [...password.matchAll(regex)];
  return match.length >= min && match.length <= max;
};

const run = async () => {
  const inputStrings = await fileToStringArray(FILE_PATH);
  const parsedData = inputStrings.map(parseString);
  const validPasswords = parsedData.filter(validatePassword);
  console.log(validPasswords.length);
  console.log(validPasswords);
};

run();
