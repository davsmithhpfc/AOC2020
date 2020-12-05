
import fs from 'fs';
import readline from 'readline';

export const fileToStringArray = async (filePath) => {
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

export const multiplyArray = numArray => numArray.reduce((acc, cur) => acc * cur, 1);

export const replaceInString = (source, index, replacement) => source.substr(0, index) + replacement + source.substr(index + replacement.length);