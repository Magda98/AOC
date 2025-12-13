import fs from 'fs';
import { sum } from 'lodash-es';

const filepath = new URL('day7test.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n').map((line) => line.split(''));

console.log('Total beam splits: ', findTotalBeamSplits(dataArray));
console.log('Total paths: ', findTotalPaths(dataArray));

function findTotalBeamSplits(grid: string[][]): number {
  const tachyonsArray = grid.slice(1);
  const beams: boolean[] = grid[0].map((char) => char === 'S');
  const cols = beams.length;
  const rows = tachyonsArray.length;
  let beamSplits = 0;

  for (let rowIndex = 0; rowIndex < rows - 1; rowIndex++) {
    for (let columnIndex = 0; columnIndex < cols; columnIndex++) {
      const nextTile = tachyonsArray[rowIndex + 1][columnIndex];
      if (nextTile === '^' && beams[columnIndex]) {
        beamSplits++;
        beams[columnIndex] = false;
        beams[columnIndex - 1] = true;
        beams[columnIndex + 1] = true;
      }
    }
  }

  return beamSplits;
}

function findTotalPaths(grid: string[][]): number {
  const tachyonsArray = grid.slice(1);
  const startCol = grid[0].indexOf('S');
  const cols = grid[0].length;
  const rows = tachyonsArray.length;

  let currentBeams: number[] = new Array(cols).fill(0);
  currentBeams[startCol] = 1;

  for (let rowIndex = 0; rowIndex < rows - 1; rowIndex++) {
    let nextBeams = new Array(cols).fill(0);

    for (let columnIndex = 0; columnIndex < cols; columnIndex++) {
      const beamCount = currentBeams[columnIndex];
      if (beamCount === 0) continue;
      const nextTile = tachyonsArray[rowIndex + 1][columnIndex];
      if (nextTile === '^') {
        if (columnIndex - 1 >= 0) nextBeams[columnIndex - 1] += beamCount;
        if (columnIndex + 1 < cols) nextBeams[columnIndex + 1] += beamCount;
      } else {
        nextBeams[columnIndex] += beamCount;
      }
    }
    currentBeams = nextBeams;
  }
  return sum(currentBeams);
}
