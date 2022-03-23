import React from "react";
import { CellState } from "../../utils/types";

import './light.css'

interface LightProps {
    col: number;
    row: number;
    onClick(rowParam: number, colParam: number): (...args: any[]) => void;
    state: CellState;
}

export const Light: React.FC<LightProps> = 
    ({col, onClick, row, state}
)=> {
    
    const renderLight = (): React.ReactNode => {
        if (state === CellState.off) {
            return <button className="lightOff" onClick={onClick(row, col)}></button>
        }
        else {
            return <button className="lightOn" onClick={onClick(row, col)}></button>
        }
    }

    return (<>
        {renderLight()}   
    </>)
}

