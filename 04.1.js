import fs from "fs";
import readline from "readline";
import { fileToStringArray, replaceInString, multiplyArray } from "./utils.js";

const FILE_PATH = "inputs/04.1.txt";

const FIELDS = [
  "byr", //(Birth Year)
  "iyr", //(Issue Year)
  "eyr", //(Expiration Year)
  "hgt", //(Height)
  "hcl", //(Hair Color)
  "ecl", //(Eye Color)
  "pid", //(Passport ID)
  "cid", //(Country ID)
];

const tokenize = (fileLine) => {
  return fileLine.split(" ").map((kvPair) => {
    const [key, value] = kvPair.split(":");
    return [[key], value];
  });
};

const passportsFromInputLines = (inputLines) => {
  return inputLines.reduce(
    (acc, cur) => {
      if (cur === undefined || cur.length === 0) {
        return acc.concat({});
      } else {
        const lastPassport = acc.pop();
        return acc.concat(
          Object.fromEntries([
            ...Object.entries(lastPassport),
            ...tokenize(cur),
          ])
        );
      }
    },
    [{}]
  );
};

const validatePassport = (passport) => {
  const fieldScoreCard = FIELDS.filter((x) => x !== "cid").map(
    (x) => !!passport[x]
  );
  return fieldScoreCard.filter((x) => !x).length === 0;
};

const run = async () => {
  const inputLines = await fileToStringArray(FILE_PATH);
  const passports = passportsFromInputLines(inputLines);
  const validPassports = passports
    .map((x) => validatePassport(x))
    .filter((x) => x);
  console.log(validPassports.length);
};

run();

