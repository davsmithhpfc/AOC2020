import { fileToStringArray } from '../utils.js';

const FILE_PATH = '../../inputs/04.1.txt';
const REQUIRED_FIELDS = [
  'byr', //(Birth Year)
  'iyr', //(Issue Year)
  'eyr', //(Expiration Year)
  'hgt', //(Height)
  'hcl', //(Hair Color)
  'ecl', //(Eye Color)
  'pid', //(Passport ID)
  // 'cid', //(Country ID)     // not required
];
const VALID_HEIGHT_UNITS = ['cm', 'in'];
const VALID_EYE_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

interface IPassport {
  byr?: number;
  iyr?: number;
  eyr?: number;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
}
interface IPassportValidation {
  byr?: boolean;
  iyr?: boolean;
  eyr?: boolean;
  hgt?: boolean;
  hcl?: boolean;
  ecl?: boolean;
  pid?: boolean;
}

const tokenize = (fileLine: string) => fileLine.split(' ').map((kvPair) => kvPair.split(':'));

const passportsFromInputLines = (inputLines: string[]) =>
  inputLines.reduce(
    (acc, cur) => {
      if (cur === undefined || cur.length === 0) {
        return acc.concat({});
      } else {
        const lastPassport = acc.pop();
        return acc.concat(Object.fromEntries([...Object.entries(lastPassport), ...tokenize(cur)]));
      }
    },
    [{}]
  );

const validatePassportFirst = (passport: IPassport) => {
  const fieldScoreCard = REQUIRED_FIELDS.map((x) => !!passport[x]);
  return fieldScoreCard.filter((x) => !x).length === 0;
};

const validatePassportSecond = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }: IPassport) => {
  const validations: IPassportValidation = {};

  try {
    validations.byr = byr >= 1920 && byr <= 2002;
    validations.iyr = iyr >= 2010 && iyr <= 2020;
    validations.eyr = eyr >= 2020 && eyr <= 2030;

    const hgtUnits = hgt.slice(-2);
    const hgtValue = Number(hgt.substring(0, hgt.length - 2));
    if (VALID_HEIGHT_UNITS.includes(hgtUnits)) {
      validations.hgt = hgtUnits === 'cm' ? hgtValue >= 150 && hgtValue <= 193 : hgtValue >= 59 && hgtValue <= 76;
    } else {
      validations.hgt = false;
    }

    validations.hcl = !!hcl.match(/^#[0-9a-f]{6}$/i);
    validations.ecl = VALID_EYE_COLORS.includes(ecl);
    validations.pid = !!pid.match(/^\d{9}$/);

    return Object.entries(validations).reduce((acc, [_, isValid]) => acc && isValid, true);
  } catch {
    // nasty catch, muhahahaha
    return false;
  }
};

const run = async () => {
  const inputArray = await fileToStringArray(FILE_PATH);

  const passports = passportsFromInputLines(inputArray);
  const validPassportsFirst = passports.map(validatePassportFirst).filter((x) => x);
  const validPassportsSecond = passports.map(validatePassportSecond).filter((x) => x);

  console.log(validPassportsFirst.length);
  console.log(validPassportsSecond.length);
};

run();
