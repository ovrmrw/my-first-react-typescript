import { ObjectKey, getObjectKeys } from 'ovrmrw-reactive-store'


export const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
  other: 0,
}

export const KEY = getObjectKeys(initialState)


export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
  other: number,
}


export interface IncrementState {
  counter: number,
}
