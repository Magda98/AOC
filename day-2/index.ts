import fs from 'fs';
import { sum } from 'lodash-es';

const filepath = new URL('day2.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.replaceAll('\n', '').split(',');

// part 1
let invalidIdsArray: number[] = [];
let invalidIdsArrayExtended: number[] = [];

for (let range of dataArray) {
  const [startNum, endNum] = range.split('-').map(Number);
  const invalidIds = searchForInvalidIds(startNum, endNum);
  invalidIdsArray = [...invalidIdsArray, ...invalidIds];
  const invalidIdsExtended = searchForInvalidIdsExtended(startNum, endNum);
  invalidIdsArrayExtended = [...invalidIdsArrayExtended, ...invalidIdsExtended];
}

console.log('🚀 ~ invalidIdsArray:', sum(invalidIdsArray));
console.log('🚀 ~ invalidIdsArrayExtended:', sum(invalidIdsArrayExtended));

function searchForInvalidIds(startRange: number, endRange: number) {
  let invalidIds: number[] = [];
  for (let id = startRange; id <= endRange; id++) {
    if (id.toString().length % 2 !== 0) continue;

    const idString = id.toString();
    const [firstHalf, secondHalf] = [
      idString.slice(0, idString.length / 2),
      idString.slice(idString.length / 2),
    ];
    if (firstHalf === secondHalf) {
      invalidIds.push(id);
    }
  }
  return invalidIds;
}

function searchForInvalidIdsExtended(startRange: number, endRange: number) {
  let invalidIds: number[] = [];
  for (let id = startRange; id <= endRange; id++) {
    const idString = id.toString();
    if (hasRepeatedSequenceOfDigits(idString)) {
      invalidIds = [...invalidIds, id];
    }
  }
  return invalidIds;
}

function hasRepeatedSequenceOfDigits(idString: string) {
  const len = idString.length;

  for (let seqLen = 1; seqLen <= Math.floor(len / 2); seqLen++) {
    if (len % seqLen !== 0) continue;
    const seq = idString.slice(0, seqLen);
    const repeated = seq.repeat(len / seqLen);
    if (repeated === idString) return true;
  }
  return false;
}
