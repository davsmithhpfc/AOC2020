import { last } from 'lodash';
import { fileToStringArray } from '../utils';

// const FILE_PATH = '../../inputs/test.txt';
const FILE_PATH = '../../inputs/input.txt';

const groupsWithUniqueAnswersFromInputLines = (inputLines: string[]) =>
  inputLines.reduce(
    (acc, cur) => {
      if (cur === undefined || cur.length === 0) {
        return [...acc, []];
      } else {
        const answerGroup = acc.pop();
        return [...acc, [...joinUniqueAnswers(answerGroup, cur)]];
      }
    },
    [[]]
  );

const joinUniqueAnswers = (answerGroup: string[], newAnswerGroup: string) => {
  const uniqueAnswers = [...answerGroup];
  for (let answer of newAnswerGroup) {
    if (!uniqueAnswers.includes(answer)) {
      uniqueAnswers.push(answer);
    }
  }
  return uniqueAnswers;
};

const groupsWithUnanimousAnswersFromInputLines = (inputLines: string[]) => {
  let memberCounter = 0;
  return inputLines.reduce(
    (acc, cur) => {
      if (cur === undefined || cur.length === 0) {
        memberCounter = 0;
        return [...acc, []];
      } else {
        const answerGroup = acc.pop();
        return [...acc, [...joinUnanimousAnswers(answerGroup, cur, memberCounter++)]];
      }
    },
    [[]]
  );
};

const joinUnanimousAnswers = (answerGroup: string[], newAnswerGroup: string, memberIndex: number) =>
  memberIndex === 0 ? Array.from(newAnswerGroup) : answerGroup.filter((x) => newAnswerGroup.includes(x));

const countUniqueAnswersPerGroup = (groups: string[][]) => groups.reduce((acc, group) => acc + group.length, 0);

const run = async () => {
  const inputLines = await fileToStringArray(FILE_PATH);
  const groupsWithUniqueAnswers = groupsWithUniqueAnswersFromInputLines(inputLines);
  const countUniqueAnswers = countUniqueAnswersPerGroup(groupsWithUniqueAnswers);

  const groupsWithUnanimousAnswers = groupsWithUnanimousAnswersFromInputLines(inputLines);
  console.log(groupsWithUnanimousAnswers);
  const countUnanimousAnswers = countUniqueAnswersPerGroup(groupsWithUnanimousAnswers);

  console.log(countUniqueAnswers);
  console.log(countUnanimousAnswers);
};

run();
