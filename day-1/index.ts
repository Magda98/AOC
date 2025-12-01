import fs from 'fs';

const filepath = new URL('day1.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n');

// part 1
let startPoint = 50;
let correctPoints = 0;
for (let item of dataArray) {
  const turn = item.substring(0, 1);
  const step = parseInt(item.substring(1), 10);

  if (turn === 'R') {
    startPoint += step;
    startPoint %= 100;
  } else if (turn === 'L') {
    startPoint += 100 - step;
    startPoint %= 100;
  }

  if (startPoint === 0) {
    correctPoints++;
  }
}

console.log('🚀 ~ correctPoints:', correctPoints);
