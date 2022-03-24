import React from "react";
import { Light } from "../Light/light";
import { generateCells, toggleLight, toggleAdjacentLights, isSolved, solve, unsolve } from "../../utils/helpers"
import { Cell } from "../../utils/types";
import './board.css'

export const Board: React.FC = () => {

    const [size, setSize] = React.useState<number>(3);
    const [board, setBoard] = React.useState<Cell[][]>(generateCells(size, size));
    const [moves, setMoves] = React.useState<number>(1);
    const [won, setWon] = React.useState<boolean>(false);
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleLightClick = (row: number, col: number) => (): void => {
        if (won) return;

        let newBoard = board.slice();

        toggleLight(newBoard[row][col]);
        if (newBoard[row][col].solution) newBoard[row][col].solution = false;
        toggleAdjacentLights(newBoard, row, col);

        if (checked) setBoard(solve(newBoard));
        else setBoard(unsolve(newBoard));
        setMoves(moves + 1);

        if (isSolved(board)) {
            alert("Congratulations, you've won in " + moves +  " moves!");
            setWon(true);
        }
    }

    const handleGenerateClick = () => (): void => {
        setMoves(1);
        setWon(false);

        var newBoard = generateCells(size, size);
        if (checked) setBoard(solve(newBoard));
        else setBoard(unsolve(newBoard));
    }

    const handleSolutionClick = () => (): void => {
        if (!won) setBoard(solve(board));
    }

    const handleChange = () => {
        setChecked(!checked);

        if (!checked) setBoard(solve(board));
        else setBoard(unsolve(board));
    };

    const renderCells = (): React.ReactNode => {
        return board.map((row, rowIdx) => 
            <div>
                {row.map((cell, colIdx) =>
                    <Light
                        row={rowIdx}
                        col={colIdx}
                        onClick={handleLightClick}
                        state={cell.state}
                        solution={cell.solution}
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

            <div>
                <label htmlFor="solution">
                    <input type="checkbox" id="solution" name="solution" 
                        checked={checked} onChange={handleChange}/>
                    always show solution
                </label>
            </div>
            
            <div className="Board">
                {renderCells()}
            </div>

        </div>
    </>)
}