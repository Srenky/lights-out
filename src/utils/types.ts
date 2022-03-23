export enum CellState {
    off,
    on
  }

export type Cell = { state: CellState, solution: boolean }