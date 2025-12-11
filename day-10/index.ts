import fs from 'fs';

const filepath = new URL('day10.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n').map((line) => line.split(' '));

let sumOfMinButtonButtonPushes = 0;
for (let [index, data] of dataArray.entries()) {
  const diagram = data[0].slice(1, -1);
  const buttons = data
    .slice(1, -1)
    .map((line) =>
      line.replace('(', '').replace(')', '').split(',').map(Number),
    );

  const minPresses = solveWithBFS(diagram, buttons);
  sumOfMinButtonButtonPushes += minPresses;
}
console.log('🚀 ~ sumOfMinButtonButtonPushes:', sumOfMinButtonButtonPushes);

function toggleIndicator(buttons: number[], indicator: string) {
  const chars = indicator.split('');
  for (let idx of buttons) {
    chars[idx] = indicator[idx] === '.' ? '#' : '.';
  }
  return chars.join('');
}

function solveWithBFS(diagram: string, buttons: number[][]): number {
  const startState = '.'.repeat(diagram.length);

  const queue: [string, number][] = [[startState, 0]];

  const visited = new Set<string>();
  visited.add(startState);

  while (queue.length > 0) {
    const [currentState, presses] = queue.shift()!;

    if (currentState === diagram) {
      return presses;
    }

    for (const buttonIndices of buttons) {
      const nextState = toggleIndicator(buttonIndices, currentState);

      if (!visited.has(nextState)) {
        visited.add(nextState);
        queue.push([nextState, presses + 1]);
      }
    }
  }

  return 0;
}
