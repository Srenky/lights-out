import React from "react";
import { Light } from "../Light/light";
import { generateCells, toggleLight, toggleAdjacentLights, isSolved } from "../../utils/helpers"
import { Cell } from "../../utils/types";
import './board.css'

export const Board: React.FC = () => {

    const [size, setSize] = React.useState<number>(3);
    const [board, setBoard] = React.useState<Cell[][]>(generateCells(size, size));
    const [moves, setMoves] = React.useState<number>(1);
    const [won, setWon] = React.useState<boolean>(false);

    const handleLightClick = (row: number, col: number) => (): void => {
        if (won) return;

        let newBoard = board.slice();

        toggleLight(newBoard[row][col]);
        toggleAdjacentLights(newBoard, row, col);

        setBoard(newBoard);
        setMoves(moves + 1);

        if (isSolved(board)) {
            alert("Congratulations, you've won in " + moves +  " moves!");
            setWon(true);
        }
    }

    const handleGenerateClick = () => (): void => {
        setMoves(1);
        setWon(false);
        setBoard(generateCells(size, size));
    }

    // TODO
    const handleSolutionClick = () => (): void => {
        
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

            <div>
                <button className="actionButton" onClick={handleSolutionClick()}>Solution</button>
                <button className="actionButton" onClick={handleGenerateClick()}>Generate</button>
            </div>
            
            <div className="Board">
                {renderCells()}
            </div>

        </div>
    </>)
}