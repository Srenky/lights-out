import { Cell, CellState } from "./types";

export const toggleLight = (cell: Cell): void => {
    if (cell.state === CellState.off) {
        cell.state = CellState.on;
    } else {
        cell.state = CellState.off;
    }
}

export const toggleAdjacentLights = (b: Cell[][], row: number, col: number): void => {
    // down
    if (row > 0) {
        toggleLight(b[row-1][col]);
    }
    // up
    if (row < b.length-1) {
        toggleLight(b[row+1][col]);
    }
    // left
    if (col > 0) {
        toggleLight(b[row][col-1]);
    }
    // right
    if (col < b.length-1) {
        toggleLight(b[row][col+1]);
    }
}

export const generateCells = (rows: number, cols: number): Cell[][] => {
    let cells: Cell[][] = [];

    // create light cells
    for (let row = 0; row < rows; row++) {
        cells.push([]);
        for (let col = 0; col < cols; col++) {
            cells[row].push({
                state: CellState.off,
                solution: false
            })
        }
    }

    // turn some of them on
    for (let i = 0; i < rows*cols; i++) {
        var row = Math.floor(Math.random() * rows);
        var col = Math.floor(Math.random() * cols);

        toggleLight(cells[row][col]);
        toggleAdjacentLights(cells, row, col);
    }

    return cells;
}

export const isSolved = (cells: Cell[][]): boolean => {
    for (let row = 0; row < cells.length; row++) {
        for (let col = 0; col < cells.length; col++) {
            if (cells[row][col].state === CellState.on) {
                return false;
            }
        }
    }
    return true;
}

export const solve = (cells: Cell[][]): Cell[][] => {
    // in this function our main focus is to get our matrix
    // to reduced row echelon form using gaussian elimination
    // every operation we do on our matrix 'neighbors',
    // both addition and swapping
    // must be done on our 'solution' vector, otherwise the solution would be incorrect

    let size = cells.length;
    let neighbors = generateNeighbors(size);
    let solution: number[] = [];

    // we are setting up the solution vector
    // corresponding to the current configuration of lights
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (cells[row][col].state === CellState.on) solution.push(1);
            else solution.push(0);
        }
    }

    // we do gaussian elimination to eliminate 1s under the diagonal
    // example: before 1 0 1 ....   after 1 iteration  1 1 0 ...
    //                 1 0 1 ....   of outer for loop  0 0 1 ...
    //                 1 1 1 ....                      0 1 1 ...
    //                 . . . ....                      . . . ...
    //                 . . . ....                      . . . ...
    for (let col = 0; col < neighbors.length - 1; col++) {
        for (let row = col + 1; row < neighbors.length; row++) {
            if (neighbors[row][col] === 1) {
                addRows(neighbors[col], neighbors[row]);
                solution[row] = (solution[row] + solution[col]) % 2;
            }
        }
        // if we happen to lose our diagonal of 1s, we must swap some rows
        // example: 1 0 1 ....
        //          0 0 1 ....  <-- must be swapped
        //          0 1 1 ....  <-- must be swapped
        //          .
        //          .
        if (neighbors[col+1][col+1] === 0) swapRows(col+1, neighbors, solution);
    }

    // again we do gaussian elimination, but in the other direction
    // to eliminate 1s over the diagonal
    // example: before .... . . .   after 1 iteration  .... . . .
    //                 .... 0 0 1   of outer for loop  .... 0 0 0
    //                 .... 1 1 0                      .... 1 1 0
    //                 .... 0 1 1                      .... 0 1 0
    //                 .... 0 0 1                      .... 0 0 1
    // what's good is that we don't have to think about swapping rows
    // since we can't lose our diagonal of 1s anymore
    for (let col = neighbors.length - 1; col > 0; col--) {
        for (let row = col - 1; row >= 0; row--) {
            if (neighbors[row][col] === 1) {
                addRows(neighbors[col], neighbors[row]);
                solution[row] = (solution[row] + solution[col]) % 2;
            }
        }
    }

    let row = -1;
    let solved = cells.slice();
    for (let i = 0; i < solution.length; i++) {
        if (i % size === 0) row++;
        if (solution[i]) solved[row][i % size].solution = true;
    }

    return solved;
}

const generateNeighbors = (size: number): number[][] => {
    let neighbors: number[][] = [];

    for (let i = 0; i < size*size; i++) {
        neighbors.push([]);
        for (let j = 0; j < size*size; j++) {
            neighbors[i].push(0);
        }
    }

    // in row R, if there is 1 in column C, that means that
    // those 2 lights are adjacent
    // each light has at least 2 adjacent lights
    for (let i = 0; i < neighbors.length; i++) {
        neighbors[i][i] = 1;
        if (i-size >= 0) neighbors[i-size][i] = 1;
        if (i+size < neighbors.length) neighbors[i+size][i] = 1;
        if (i-1 >= 0 && i % size !== 0) neighbors[i-1][i] = 1;
        if (i+1 < neighbors.length && (i+1) % size !== 0) neighbors[i+1][i] = 1;
    }

    return neighbors;
}

const addRows = (A: number[], B: number[]): void => {
    // we simply add two rows with one simple rule,
    // 1 + 1 = 0
    for (let i = 0; i < B.length; i++) B[i] = (B[i] + A[i]) % 2;
}

const swapRows = (col: number, A: number[][], B: number[]): void => {
    // we find the first row that has 1 on our wanted position
    // and swap it with our current row

    let index = col;
    for (let row = col + 1; row < A.length; row++) {
        if (A[row][col] === 1) {
            index = row;
            break;
        }
    }
    let temp = A[index];
    A[index] = A[col];
    A[col] = temp;

    let t = B[index];
    B[index] = B[col];
    B[col] = t;
}