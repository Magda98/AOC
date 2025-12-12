import fs from 'fs';

const filepath = new URL('day8.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n').map((line) => line.split(','));

const pairs: Array<{ i: number; j: number; dist: number }> = [];
for (let i = 0; i < dataArray.length; i++) {
  for (let j = i; j < dataArray.length; j++) {
    if (i !== j)
      pairs.push({
        i,
        j,
        dist: distance(dataArray[i].map(Number), dataArray[j].map(Number)),
      });
  }
}

pairs.sort((a, b) => a.dist - b.dist);

function distance(point1: number[], point2: number[]): number {
  const dx = point1[0] - point2[0];
  const dy = point1[1] - point2[1];
  const dz = point1[2] - point2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

class UnionFind {
  parent: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const px = this.find(x);
    const py = this.find(y);
    if (px === py) return false;
    this.parent[px] = py;
    return true;
  }
}
const N = dataArray.length;
let connections = 0;
let i: number[] = [];
let j: number[] = [];
const uf = new UnionFind(dataArray.length);
for (const [index, pair] of pairs.entries()) {
  //part 1 (stop after 1000 connections)
  // if (index === 1000) {
  //   break;
  // }
  if (uf.union(pair.i, pair.j)) {
    connections++;

    if (connections === N - 1) {
      const x_i = Number(dataArray[pair.i][0]);
      const x_j = Number(dataArray[pair.j][0]);

      const result = x_i * x_j;
      console.log('part 2:', result);
      break;
    }
  }
}

const circuits = new Map<number, number>();
for (let i = 0; i < dataArray.length; i++) {
  const root = uf.find(i);
  circuits.set(root, (circuits.get(root) ?? 0) + 1);
}

const sizes = Array.from(circuits.values()).sort((a, b) => b - a);
const result = sizes[0] * sizes[1] * sizes[2];

console.log('Product of 3 largest:', result);
