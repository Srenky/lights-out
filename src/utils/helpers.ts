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