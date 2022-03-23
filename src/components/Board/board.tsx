import React from "react";
import { Light } from "../Light/light";
import { generateCells } from "../../utils/helpers"
import { Cell, CellState } from "../../utils/types";
import './board.css'

export const Board: React.FC = () => {

    const [size, setSize] = React.useState<number>(3);
    const [board, setBoard] = React.useState<Cell[][]>(generateCells(size, size));
    const [moves, setMoves] = React.useState<number>(0);
    const [won, setWon] = React.useState<boolean>(false);

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
    
    const isSolved = (): boolean => {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (board[row][col].state === CellState.on) {
                    return false;
                }
            }
        }
        return true;
    }

    const handleLightClick = (row: number, col: number) => (): void => {
        if (won) return;

        let newBoard = board.slice();

        toggleLight(newBoard[row][col]);
        toggleAdjacentLights(newBoard, row, col);

        setBoard(newBoard);
        setMoves(moves + 1);

        if (isSolved()) {
            alert("Congratulations, you've won in " + moves +  " moves!");
            setWon(true);
        }
    }

    const handleGenerateClick = () => (): void => {
        setMoves(0);
        setWon(false);
        setBoard(generateCells(size, size));
    }

    const renderCells = (): React.ReactNode => {
        return board.map((row, rowIdx) => 
            <div>
                {row.map((cell, colIdx) =>
                    <Light
                        row={rowIdx}
                        col={colIdx}
                        onClick={handleLightClick}
                        state={cell.state}
                    />
                )}
            </div>
        )
    }

    return (<>
        <div className="Body">
            <div className="Header">
                <label htmlFor="size">Choose size: </label>
                <select name="size" id="size" value={size} onChange={(e) => setSize(Number(e.target.value))}>
                    <option value="3">3x3</option>
                    <option value="4">4x4</option>
                    <option value="5">5x5</option>
                    <option value="6">6x6</option>
                </select>    
            </div>
            <button className="generateButton" onClick={handleGenerateClick()}>generate</button>
            <div className="Board">
                {renderCells()}
            </div>
        </div>
    </>)
}