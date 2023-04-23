function moveMatrixElements(
  matrix: number[][],
  direction: Direction
): number[][] {
  const result: number[][] = [];

  for (let i = 0; i < matrix.length; i++) {
    const nonzeros: number[] = [];
    const zeros: number[] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (["left", "right"].includes(direction)) {
        feed(matrix, nonzeros, zeros, i, j);
      } else {
        feed(matrix, nonzeros, zeros, j, i);
      }
    }
    if (["left", "up"].includes(direction)) {
      nonzeros.push(...zeros);
    } else {
      nonzeros.unshift(...zeros);
    }

    if (["left", "right"].includes(direction)) {
      result.push(nonzeros);
    } else {
      for (let j = 0; j < matrix.length; j++) {
        result[j] = result[j] || [];
        result[j][i] = j < nonzeros.length ? nonzeros[j] : 0;
      }
    }
  }

  return result;
}

function feed(
  matrix: number[][],
  nonzero: number[],
  zeros: number[],
  i: number,
  j: number
) {
  if (matrix[i][j] !== 0) {
    if (
      nonzero.length > 0 &&
      nonzero[nonzero.length - 1] === matrix[i][j] &&
      !zeros.includes(matrix[i][j])
    ) {
      // Add the current element to the last element in the nonzero if they are the same
      nonzero[nonzero.length - 1] *= 2;
      zeros.push(0); // Add the current element to the zeros array
    } else {
      nonzero.push(matrix[i][j]);
    }
  } else {
    zeros.push(matrix[i][j]);
  }
}

function gatherColumn(
  column: number[],
  matrix: number[][],
  result: number[][],
  j: number
) {
  for (let i = 0; i < matrix.length; i++) {
    result[i] = result[i] || [];
    result[i][j] = i < column.length ? column[i] : 0;
  }
  return result;
}
function isUnsqueezable(matrix: number[][]): boolean {
  const directions: Direction[] = ["up", "down", "left", "right"];

  directions.forEach((direction) => {
    const newMatrix = moveMatrixElements(matrix, direction);
    if (JSON.stringify(newMatrix) !== JSON.stringify(matrix)) {
      return false;
    }
  });

  return true;
}
function addRandomTwo(matrix: number[][], random = 2): number[][] {
  const emptyCells: [number, number][] = [];
  const clonedMatrix = matrix.map((row) => [...row]);
  // Find all empty cells in the matrix
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === 0) {
        emptyCells.push([rowIndex, columnIndex]);
      }
    });
  });

  // If there are no empty cells, return without doing anything
  if (emptyCells.length === 0) {
    return clonedMatrix;
  }

  // Choose a random empty cell and set its value to 2
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const [rowIndex, columnIndex] = emptyCells[randomIndex];
  clonedMatrix[rowIndex][columnIndex] = random;
  return clonedMatrix;
}
type Direction = "up" | "down" | "left" | "right";
type TestCase = {
  matrix: number[][];
  direction: Direction;
  expected: number[][];
};

const testCases: TestCase[] = [
  {
    matrix: [
      [0, 0, 2, 4],
      [0, 2, 0, 2],
      [0, 4, 0, 2],
      [0, 2, 0, 0],
    ],
    direction: "right",
    expected: [
      [0, 0, 2, 4],
      [0, 0, 0, 4],
      [0, 0, 4, 2],
      [0, 0, 0, 2],
    ],
  },
  {
    matrix: [
      [0, 0, 2, 4],
      [0, 2, 0, 2],
      [0, 4, 0, 2],
      [0, 2, 0, 0],
    ],
    direction: "down",
    expected: [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 4, 0, 4],
      [0, 2, 2, 4],
    ],
  },
  {
    matrix: [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 4, 0, 4],
      [0, 2, 2, 4],
    ],
    direction: "left",
    expected: [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [8, 0, 0, 0],
      [4, 4, 0, 0],
    ],
  },
  {
    matrix: [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 4, 0, 4],
      [0, 2, 2, 4],
    ],
    direction: "right",
    expected: [
      [0, 0, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 0, 8],
      [0, 0, 4, 4],
    ],
  },
  {
    matrix: [
      [2, 2, 2, 2],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
    ],
    direction: "up",
    expected: [
      [4, 4, 4, 4],
      [4, 4, 4, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    matrix: [
      [4, 4, 4, 4],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    direction: "left",
    expected: [
      [8, 8, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    matrix: [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
    ],
    direction: "right",
    expected: [
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 2],
    ],
  },
  {
    matrix: [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
    ],
    direction: "down",
    expected: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 0, 0],
      [4, 0, 0, 0],
    ],
  },
  {
    matrix: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    direction: "up",
    expected: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    matrix: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    direction: "down",
    expected: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    matrix: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    direction: "left",
    expected: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    matrix: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    direction: "right",
    expected: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    matrix: [
      [0, 0, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 8, 8],
      [0, 0, 0, 0],
    ],
    direction: "down",
    expected: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 2],
      [0, 0, 8, 8],
    ],
  },
  {
    matrix: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
    ],
    direction: "up",
    expected: [
      [4, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    matrix: [
      [2, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 2],
    ],
    direction: "right",
    expected: [
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 2],
    ],
  },
  {
    matrix: [
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    direction: "left",
    expected: [
      [8, 0, 0, 0],
      [8, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
];
function runTests() {
  for (let i = 0; i < testCases.length; i++) {
    const { matrix, direction, expected } = testCases[i];
    const result = moveMatrixElements(matrix, direction);
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      console.error(
        `Test case ${i + 1} failed: expected ${JSON.stringify(
          expected
        )}, but got ${JSON.stringify(result)}`
      );
    } else {
      console.log(`Test case ${i + 1} passed!`);
    }
  }
}
function runTestAddRandomTwo() {
  for (let i = 0; i < testCases.length; i++) {
    const { matrix, direction, expected } = testCases[i];
    const result = addRandomTwo(matrix);
    console.log(result);
  }
}
runTests();
runTestAddRandomTwo();
