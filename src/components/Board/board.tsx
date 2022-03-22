import React from "react";
import { Light } from "../Light/light";
import { generateCells } from "../../utils/helpers"
import { Cell, CellState } from "../../utils/types";

export const Board: React.FC = () => {

    const [board, setBoard] = React.useState<Cell[][]>(generateCells());
    const [moves, setMoves] = React.useState<number>(0);

    const toggleLight = (cell: Cell): void => {
        if (cell.state === CellState.off) {
            cell.state = CellState.on;
        } else {
            cell.state = CellState.off;
        }
    }

    const toggleAdjacentLights = (b: Cell[][], row: number, col: number): void => {
        // down
        if (row > 0) {
            toggleLight(b[row-1][col]);
        }
        // up
        if (row < 2) {
            toggleLight(b[row+1][col]);
        }
        // left
        if (col > 0) {
            toggleLight(b[row][col-1]);
        }
        // right
        if (col < 2) {
            toggleLight(b[row][col+1]);
        }
    }
    
    const handleButtonClick = (row: number, col: number) => (): void => {
        let newBoard = board.slice();

        toggleLight(newBoard[row][col]);
        toggleAdjacentLights(newBoard, row, col);

        setBoard(newBoard);
        setMoves(moves + 1);
    }

    const renderCells = (): React.ReactNode => {
        return board.map((row, rowIdx) => 
            <div>
                {row.map((cell, colIdx) =>
                    <Light
                        row={rowIdx}
                        col={colIdx}
                        onClick={handleButtonClick}
                        state={cell.state}
                    />
                )}
            </div>
        )
    }

    return (<>
        <div className="Board">{renderCells()}</div>
    </>)
}