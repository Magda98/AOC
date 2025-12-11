import fs from 'fs';

const filepath = new URL('day11.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n');
const positions = dataArray.map((line) => line.split(':')[0]);
const nextPositionsArray = dataArray.map((line) =>
  line.split(':')[1].trim().split(' '),
);

const start = nextPositionsArray[findPositionIdx('you')] ?? [];
const sumOfEscape = findNextPosition([...start], 0, 'out') ?? 0;
console.log('Sum of escape paths:', sumOfEscape);
const startSvr = nextPositionsArray[findPositionIdx('svr')] ?? [];
const startDac = nextPositionsArray[findPositionIdx('dac')] ?? [];
const startFft = nextPositionsArray[findPositionIdx('fft')] ?? [];
const dacFft = findEscapePathsMemoized([...startDac], 'fft');
console.log('🚀 ~ fftDac (fft is before dac in graph?):', dacFft > 0);
const svrFft = findEscapePathsMemoized([...startSvr], 'fft');
const fftDac = findEscapePathsMemoized([...startFft], 'dac');
const dacOut = findEscapePathsMemoized([...startDac], 'out');
console.log('🚀 ~ Total Paths:', svrFft * fftDac * dacOut);

function findNextPosition(
  arrayToProcess: string[],
  sumOfEscape: number,
  stop = 'out',
): number {
  const node = arrayToProcess.shift();

  if (node === undefined) {
    return sumOfEscape;
  }

  if (node === stop) {
    return findNextPosition(arrayToProcess, sumOfEscape + 1);
  } else {
    const nextPositions = nextPositionsArray[findPositionIdx(node)];
    return findNextPosition([...nextPositions, ...arrayToProcess], sumOfEscape);
  }
}

function findPositionIdx(position: string) {
  return positions.indexOf(position);
}

type MemoCache = {
  [node: string]: number;
};

function findEscapePathsMemoized(
  initialNodes: string[],
  stopNode: string = 'out',
): number {
  const memo: MemoCache = {};
  let totalPaths = 0;

  function countPaths(node: string): number {
    if (node in memo) {
      return memo[node];
    }

    if (node === stopNode) {
      return 1;
    }

    const idx = findPositionIdx(node);
    if (idx === -1) {
      return 0;
    }
    let pathsFromNode = 0;
    const nextPositions = nextPositionsArray[idx];
    for (const nextNode of nextPositions) {
      pathsFromNode += countPaths(nextNode);
    }
    memo[node] = pathsFromNode;

    return pathsFromNode;
  }

  for (const startNode of initialNodes) {
    totalPaths += countPaths(startNode);
  }

  return totalPaths;
}
