import fs from 'fs';

const filepath = new URL('day7.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n').map((line) => line.split(''));

const tachyonsArray = dataArray.slice(1);
const beams: boolean[] = dataArray[0].map((char) => char === 'S');

let beamSplits = 0;
for (let [columnIndex, tachyons] of tachyonsArray.entries()) {
  for (let [rowIndex, char] of tachyons.entries()) {
    if (char === '^' && beams[rowIndex]) {
      beamSplits++;
      beams[rowIndex] = false;
      beams[rowIndex - 1] = true;
      beams[rowIndex + 1] = true;
    }
  }
}

console.log('Total beam splits: ', beamSplits);
