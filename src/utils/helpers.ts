import { Cell, CellState } from "./types";


export const generateCells = (): Cell[][] => {
    let cells: Cell[][] = [];

    for (let row = 0; row < 3; row++) {
        cells.push([]);
        for (let col = 0; col < 3; col++) {
            cells[row].push({
                state: CellState.off
            })
        }
    }

    return cells;
}