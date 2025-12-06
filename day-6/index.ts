import fs from 'fs';

const filepath = new URL('day6.txt', import.meta.url);
const data = await fs.promises.readFile(filepath, 'utf8');
const dataArray = data
  .split('\n')
  .map((line) => line.split(' ').filter((line) => line.trim().length));

const numbersArray = dataArray.slice(0, -1);
const operators = dataArray.at(-1) || [];

const dataForCephalopodMath = data
  .split('\n')
  .slice(0, -1)
  .map((line) => line.split(''));

// part 1
let result = 0;
for (let yIndex = 0; yIndex < numbersArray[0].length; yIndex++) {
  const operator = operators[yIndex];
  const numbersInColumn = numbersArray.map((row) => Number(row[yIndex]));
  result += resultOfColumnExpression(operator, numbersInColumn);
}

console.log('Sum of result from all columns:', result);

// part 2 - cephalopod math
let cephalopodMathResult = 0;
let operatorIndex = 0;
let preparedNumbersArray: number[] = [];
let preparedNumbers = -1;
for (let yIndex = 0; yIndex <= dataForCephalopodMath[0].length; yIndex++) {
  preparedNumbers = prepareNumbersForCephalopodMath(
    dataForCephalopodMath.map((row) => row[yIndex]),
  );

  if (preparedNumbers !== 0) {
    preparedNumbersArray.push(preparedNumbers);
  } else if (preparedNumbers === 0) {
    const operator = operators[operatorIndex];
    cephalopodMathResult += resultOfColumnExpression(
      operator,
      preparedNumbersArray,
    );
    operatorIndex++;
    preparedNumbersArray = [];
  }
}

console.log(
  'Sum of cephalopod math result from all columns:',
  cephalopodMathResult,
);

function resultOfColumnExpression(operator: string, numbersInColumn: number[]) {
  let result = 0;

  for (const value of numbersInColumn) {
    if (operator === '+') {
      result += value;
    } else if (operator === '*') {
      result = result === 0 ? value : result * value;
    }
  }
  return result;
}

function prepareNumbersForCephalopodMath(column: string[]) {
  return Number(column.join('').trim());
}
