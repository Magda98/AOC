import fs from 'fs';

const filepath = new URL('day9.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n').map((line) => line.split(',').map(Number));

const pairs: Array<{
  p1: number[];
  p2: number[];
  p3: number[];
  p4: number[];
  surface: number;
}> = [];
for (let i = 0; i < dataArray.length; i++) {
  for (let j = i + 1; j < dataArray.length; j++) {
    const point1 = dataArray[i];
    const point2 = dataArray[j];
    const point3 = [point1[0], point2[1]];
    const point4 = [point2[0], point1[1]];
    pairs.push({
      p1: point1,
      p2: point2,
      p3: point3,
      p4: point4,
      surface: rectangleSurface(dataArray[i], dataArray[j]),
    });
  }
}

pairs.sort((a, b) => b.surface - a.surface);

function rectangleSurface(point1: number[], point2: number[]): number {
  const dx = Math.abs(point1[0] - point2[0]) + 1;
  const dy = Math.abs(point1[1] - point2[1]) + 1;
  return dx * dy;
}

console.log('Largest rectangle surface:', pairs[0].surface);
