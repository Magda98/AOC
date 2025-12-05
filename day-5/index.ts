import fs from 'fs';
import { split, sumBy } from 'lodash-es';

const filepath = new URL('day5.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const [rangesString, ingredientsString] = data.split('\n\n');
const ranges = rangesString.split('\n');
const ingredients = ingredientsString.split('\n');

// part 1
let validIngredientsCount = 0;
for (const ingredient of ingredients) {
  if (isValidIngredient(ingredient, ranges)) {
    validIngredientsCount++;
  }
}
console.log('Number of valid ingredients:', validIngredientsCount);

// part 2
const validIngredients = parseAllRanges(ranges);
const sumOfAllValidIngredients = sumBy(
  validIngredients,
  (item) => item[1] - item[0] + 1,
);
console.log('Sum of all valid ingredients:', sumOfAllValidIngredients);

function isValidIngredient(ingredient: string, ranges: string[]): boolean {
  for (const range of ranges) {
    const [minStr, maxStr] = range.split('-');
    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);
    const value = parseInt(ingredient, 10);
    if (value >= min && value <= max) {
      return true;
    }
  }
  return false;
}

function parseAllRanges(ranges: string[]) {
  const validIngredientsRanges: [number, number][] = ranges
    .map((range) => split(range, '-').map(Number) as [number, number])
    .toSorted((a, b) => a[0] - b[0]);

  const mergedRanges: [number, number][] = [];

  for (const [min, max] of validIngredientsRanges) {
    if (mergedRanges.length === 0) {
      mergedRanges.push([min, max]);
    } else {
      const [lastMin, lastMax] = mergedRanges[mergedRanges.length - 1];

      if (min <= lastMax + 1) {
        mergedRanges[mergedRanges.length - 1] = [
          lastMin,
          Math.max(lastMax, max),
        ];
      } else {
        mergedRanges.push([min, max]);
      }
    }
  }

  return mergedRanges;
}
