import { fileToStringArray } from '../utils';

const FILE_PATH = '../../inputs/input.txt';
const SEAT_ROW_COUNT = 128;
const SEAT_COLUMN_COUNT = 8;

enum Direction {
  Front = 'F',
  Back = 'B',
  Left = 'L',
  Right = 'R',
}
interface IRange {
  min: number;
  max: number;
}
interface ISeat {
  row: number;
  col: number;
  seatId: number;
}

const moveNext = ({ min, max }: IRange, direction: Direction) =>
  direction === Direction.Front || direction === Direction.Left
    ? { min, max: max - (max - min) / 2 }
    : { min: min + (max - min) / 2, max };

const calcRowColumnRanges = (movementArray: Direction[]) =>
  movementArray.reduce(
    (acc, direction) =>
      direction === Direction.Front || direction === Direction.Back
        ? { ...acc, row: moveNext(acc.row, direction) }
        : { ...acc, col: moveNext(acc.col, direction) },
    {
      row: { min: 0, max: SEAT_ROW_COUNT },
      col: { min: 0, max: SEAT_COLUMN_COUNT },
    }
  );

const processBoardingPass = (boardingPass: string) => {
  const movementArray = Array.from(boardingPass) as Direction[];
  const { col, row } = calcRowColumnRanges(movementArray);
  return {
    row: row.min,
    col: col.min,
    seatId: row.min * 8 + col.min,
  };
};

const findSeatsNextToEmpty = (sortedSeats: ISeat[]) =>
  sortedSeats.reduce((acc, cur, index, arr) => {
    if (!arr[index - 1] || !arr[index + 1]) {
      return acc;
    } else if (arr[index - 1].seatId !== cur.seatId - 1 || arr[index + 1].seatId !== cur.seatId + 1) {
      return [...acc, cur.seatId];
    } else {
      return acc;
    }
  }, []);

const run = async () => {
  const inputArray = await fileToStringArray(FILE_PATH);

  const sortedSeats = inputArray.map(processBoardingPass).sort((a, b) => (a.seatId < b.seatId ? -1 : 1));
  const seatsNextToEmpty = findSeatsNextToEmpty(sortedSeats);

  console.log(sortedSeats[sortedSeats.length -1].seatId);
  console.log(seatsNextToEmpty);
};

run();
