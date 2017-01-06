import { ObjectKeys } from '../lib/simple-store'


export const initialState: AppState = {
  increment: {
    counter: 0
  },
  lastUpdated: 0,
  other: 0,
}


export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
  other: number,
}


export const KEY: ObjectKeys<AppState> = {
  increment: 'increment',
  lastUpdated: 'lastUpdated',
  other: 'other',
}


export interface IncrementState {
  counter: number
}
