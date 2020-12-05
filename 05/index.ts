import { exception } from 'console';
import { fileToStringArray } from './utils';

// const FILE_PATH = '../inputs/test.txt';
const FILE_PATH = '../inputs/input.txt';
const SEAT_ROW_COUNT = 128;
const SEAT_COLUMN_COUNT = 8;

type Range = { min: number; max: number };
enum Direction {
  Front = 'F',
  Back = 'B',
  Left = 'L',
  Right = 'R',
}

const moveNext = ({ min, max }: Range, direction: Direction) => {
  return direction === Direction.Front || direction === Direction.Left
    ? { min, max: max - (max - min) / 2 }
    : { min: min + (max - min) / 2, max };
};

const processBoardingPass = (boardingPass: string) => {
  const movementArray = Array.from(boardingPass) as Direction[];
  const { col, row } = movementArray.reduce(
    (acc, cur: Direction) => {
      if ([Direction.Front, Direction.Back].includes(cur)) {
        const newRowRange = moveNext(acc.row, cur);
        return { ...acc, row: newRowRange };
      } else if ([Direction.Left, Direction.Right].includes(cur)) {
        const newColRange = moveNext(acc.col, cur);
        return { ...acc, col: newColRange };
      }
    },
    { row: { min: 0, max: SEAT_ROW_COUNT }, col: { min: 0, max: SEAT_COLUMN_COUNT } }
  );
  return {
    row: row.min,
    col: col.min,
    seatId: row.min * 8 + col.min,
  };
};

const run = async () => {
  const inputArray = await fileToStringArray(FILE_PATH);

  const seats = inputArray.map(processBoardingPass);
  const sortedSeats = seats.sort((a, b) => (a.seatId < b.seatId ? -1 : 1));
  const seatsNextToEmpty = sortedSeats.reduce((acc, cur, index, arr) => {
    if (!arr[index - 1] || !arr[index + 1]) {
      return acc;
    } else if (arr[index - 1].seatId !== cur.seatId - 1 || arr[index + 1].seatId !== cur.seatId + 1) {
      return [...acc, cur.seatId];
    } else {
      return acc;
    }
  }, []);

  console.log(seats.reduce((max, { seatId }) => (seatId > max ? seatId : max), 0));
  console.log(seatsNextToEmpty);
};

run();
