import { fileToStringArray, replaceInString, multiplyArray } from "./utils.js";

// const FILE_PATH = "inputs/04.test.2.txt";
const FILE_PATH = "inputs/04.1.txt";

const tokenize = (fileLine) =>
  fileLine.split(" ").map((kvPair) => {
    const [key, value] = kvPair.split(":");
    return [[key], value];
  });

const passportsFromInputLines = (inputLines) =>
  inputLines.reduce(
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

const validatePassport = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
  const validations = {};

  //check byr
  try {
    validations.byr = byr >= 1920 && byr <= 2002;
    validations.iyr = iyr >= 2010 && iyr <= 2020;
    validations.eyr = eyr >= 2020 && eyr <= 2030;

    const hgtUnits = hgt.slice(-2);
    const hgtValue = hgt.substring(0, hgt.length - 2);
    if (["cm", "in"].includes(hgtUnits)) {
      validations.hgt =
        hgtUnits === "cm"
          ? hgtValue >= 150 && hgtValue <= 193
          : hgtValue >= 59 && hgtValue <= 76;
    } else {
      validations.hgt = false;
    }

    validations.hcl = !!hcl.match(/^#[0-9a-f]{6}$/i);
    validations.ecl = [
      "amb",
      "blu",
      "brn",
      "gry",
      "grn",
      "hzl",
      "oth",
    ].includes(ecl);
    validations.pid = !!pid.match(/^\d{9}$/);

    return Object.entries(validations).reduce(
      (acc, [key, value]) => acc && value,
      true
    );
  } catch {
    return false;
  }
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
