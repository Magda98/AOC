import fs from 'fs';

const filepath = new URL('day8test.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data.split('\n').map((line) => line.split(','));

const pairs: Array<{ i: number; j: number; dist: number }> = [];
for (let i = 0; i < dataArray.length; i++) {
  for (let j = i + 1; j < dataArray.length; j++) {
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

let connections = 0;
const uf = new UnionFind(dataArray.length);
for (const pair of pairs) {
  uf.union(pair.i, pair.j);
  connections++;
  if (connections === dataArray.length) break;
}

const circuits = new Map<number, number>();
for (let i = 0; i < dataArray.length; i++) {
  const root = uf.find(i);
  circuits.set(root, (circuits.get(root) ?? 0) + 1);
}

const sizes = Array.from(circuits.values()).sort((a, b) => b - a);
const result = sizes[0] * sizes[1] * sizes[2];

console.log('Product of 3 largest:', result);
