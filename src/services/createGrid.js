const make2DArray = (rows, cols) => {
  const array = new Array(rows);

  for (let i = 0; i < rows; i++) {
    array[i] = new Array(cols);
  }

  return array;
};

let rows = 20;
let cols = 20;
let grid;

export const setup = () => {
  grid = make2DArray(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.round(Math.random());
    }
  }

  return grid;
};

export const generate = grid => {
  let next = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let neighbors = countNeighbors(grid, i, j);

      if (state === 0 && neighbors === 3) {
        next[i][j] = 1;
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  return next;
};

const countNeighbors = (grid, x, y) => {
  let sum = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let row = (x + i + rows) % rows;
      let col = (y + j + cols) % cols;
      sum += grid[row][col];
    }
  }

  sum -= grid[x][y];

  return sum;
};

export const checkEmptyGrid = () => {
  return grid.every(row => row.every(col => col === 0));
};
