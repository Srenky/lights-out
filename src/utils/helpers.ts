import { Cell, CellState } from "./types";


export const generateCells = (rows: number, cols: number): Cell[][] => {
    let cells: Cell[][] = [];

    for (let row = 0; row < rows; row++) {
        cells.push([]);
        for (let col = 0; col < cols; col++) {
            cells[row].push({
                state: CellState.off
            })
        }
    }

    

    return cells;
}