import fs from 'fs';
import { sumBy } from 'lodash-es';

const filepath = new URL('day12.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n\n');
const presents = dataArray
  .slice(0, -1)
  .map((line) => line.split(':')[1].trim().split('\n'));
const regions: [string, number[]] = dataArray
  .slice(-1)[0]
  .split('\n')
  .map((line) => {
    const [area, numOfPresents] = line.split(':');
    return [area, numOfPresents.trim().split(' ').map(Number)];
  }) as unknown as [string, number[]];
const presentsArea = presents.map(
  (present) => present.join().replaceAll('.', '').replaceAll(',', '').length,
);

let numOfValidRegions = 0;
for (let [area, numOfPresents] of regions) {
  const [x, y] = (area as string).split('x').map(Number);
  const a = x * y;

  const presentArea = (numOfPresents as unknown as number[]).map(
    (quantity, index) => {
      return quantity > 0 ? quantity * presentsArea[index] : 0;
    },
  );
  const sum = sumBy(presentArea);
  if (sum <= a) numOfValidRegions++;
}

console.log(numOfValidRegions);
