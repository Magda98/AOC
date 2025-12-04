import fs from 'fs';

const filepath = new URL('day4.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n').map((line) => line.split(''));

// part 1
console.log('Count of accessible paper rolls:', checkAccessiblePaperRolls());

// part 2
let countOfAccessiblePaperRolls = 0;
while (true) {
  const currentCount = checkAccessiblePaperRolls(true);
  if (currentCount === 0) break;
  countOfAccessiblePaperRolls += currentCount;
}

console.log(
  'Count of accessible paper rolls when removing accessible rolls:',
  countOfAccessiblePaperRolls,
);

function checkAccessiblePaperRolls(removePaperRoll = false): number {
  let count = 0;
  for (let [rowIndex, row] of dataArray.entries()) {
    for (let [colIndex, cell] of row.entries()) {
      if (cell === '@') {
        if (isAccessible(rowIndex, colIndex)) {
          count++;
          if (removePaperRoll) dataArray[rowIndex][colIndex] = '.';
        }
      }
    }
  }
  return count;
}

function isAccessible(rowIndex: number, colIndex: number): boolean {
  let numberOfAdjacentRolls = 0;
  for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
    for (let j = colIndex - 1; j <= colIndex + 1; j++) {
      if (i === rowIndex && j === colIndex) continue;
      if (dataArray?.[i]?.[j] === '@') {
        numberOfAdjacentRolls++;
      }
    }
  }
  return numberOfAdjacentRolls < 4;
}
