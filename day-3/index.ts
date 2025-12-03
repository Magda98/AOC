import fs from 'fs';
import { max } from 'lodash-es';

const filepath = new URL('day3.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n');
let capacity = 0;

for (let bank of dataArray) {
  const batteries = bank.split('');
  const maxCapacity = findMaximumCapacity(batteries);
  capacity += maxCapacity;
}

console.log('🚀 ~ capacity:', capacity);
console.log(
  '🚀 ~ findMaximumCapacityExtended:',
  findMaximumCapacityExtended(dataArray),
);

function findMaximumCapacity(batteries: string[]) {
  let sortedBatteries = batteries.toSorted().toReversed();
  let indexOfLargest = batteries.indexOf(sortedBatteries[0]);
  let maxCapacity = '';

  while (sortedBatteries.length > 0) {
    if (indexOfLargest !== batteries.length - 1) {
      const restSortedBatteries = batteries
        .slice(indexOfLargest + 1)
        .toSorted()
        .toReversed();
      maxCapacity = `${batteries[indexOfLargest]}${restSortedBatteries[0]}`;
      return Number(maxCapacity);
    } else {
      sortedBatteries = sortedBatteries.slice(1);
      indexOfLargest = batteries.indexOf(sortedBatteries[0]);
    }
  }
  return 0;
}

function findMaximumCapacityExtended(banks: string[]) {
  let maxCapacity = 0;

  for (let batteries of banks) {
    let batteriesNum = batteries.split('').map((b) => Number(b));
    let usedIndexes: number[] = [];
    let capacity: number[] = [];

    for (let i = 12; i > 0; i--) {
      const indexOfMax = findIndexOfMaxNumberWithinRange(
        batteriesNum,
        batteriesNum.length - i + 1,
        usedIndexes.at(-1) ?? -1,
      );
      capacity.push(batteriesNum[indexOfMax]);
      usedIndexes.push(indexOfMax);
    }
    maxCapacity += Number(capacity.join(''));
  }
  return maxCapacity;
}

function findIndexOfMaxNumberWithinRange(
  numbers: number[],
  lessThanIndex: number,
  greaterThanIndex: number,
): number {
  let maxIndex = greaterThanIndex + 1;
  for (let i = greaterThanIndex + 1; i < lessThanIndex; i++) {
    if (numbers[i] > numbers[maxIndex]) {
      maxIndex = i;
    }
  }

  return maxIndex;
}
