import React from "react";
import { CellState } from "../../utils/types";

import './light.css'

interface LightProps {
    col: number;
    row: number;
    onClick(rowParam: number, colParam: number): (...args: any[]) => void;
    state: CellState;
    solution: boolean;
}

export const Light: React.FC<LightProps> = 
    ({col, onClick, row, state, solution}
)=> {
    
    const renderLight = (): React.ReactNode => {
        if (state === CellState.off) {
            if (solution) return <button className="lightOffSolution" onClick={onClick(row, col)}></button>
            return <button className="lightOff" onClick={onClick(row, col)}></button>
        }
        else {
            if (solution) return <button className="lightOnSolution" onClick={onClick(row, col)}></button>
            return <button className="lightOn" onClick={onClick(row, col)}></button>
        }
    }

    return (<>
        {renderLight()}   
    </>)
}

