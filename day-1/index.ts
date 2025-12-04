import fs from 'fs';

const filepath = new URL('day1.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n');

// part 1
let startPoint = 50;
let correctPoints = 0;
// part 2
let passesThroughZero = 0;

for (let item of dataArray) {
  const turn = item.substring(0, 1);
  const step = Number(item.substring(1));

  const passes = numberOfZeroPointPasses(startPoint, step, turn);
  passesThroughZero += passes;

  startPoint = calculateCurrentPoint(startPoint, step, turn);
  if (startPoint === 0) {
    correctPoints++;
  }
}

console.log('🚀 ~ correctPoints:', correctPoints);
console.log('🚀 ~ totalPoints:', correctPoints + passesThroughZero);

function calculateCurrentPoint(start: number, step: number, turn: string) {
  let currentPoint = start;
  if (turn === 'R') {
    currentPoint += step;
  } else if (turn === 'L') {
    currentPoint -= step;
  }
  currentPoint = ((currentPoint % 100) + 100) % 100;
  return currentPoint;
}

function numberOfZeroPointPasses(start: number, step: number, turn: string) {
  let nextPoint = start;

  if (turn === 'R') {
    nextPoint += step;
  } else {
    nextPoint -= step;
  }

  const quotient = Math.floor(Math.abs(nextPoint) / 100);
  const remainder = Math.abs(nextPoint) % 100;
  const isOutOfBounds = turn === 'R' ? nextPoint > 100 : nextPoint < 0;

  if (!isOutOfBounds) {
    return 0;
  }

  if (turn === 'R') {
    if (remainder === 0) {
      return start !== 0 ? quotient - 1 : quotient - 2;
    }
    return quotient;
  }

  if (remainder === 0) {
    return start !== 0 ? quotient : quotient - 1;
  }

  return start !== 0 ? quotient + 1 : quotient;
}
