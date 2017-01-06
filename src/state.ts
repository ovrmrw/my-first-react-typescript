import { ObjectKeys } from './simple-store'


export const initialState: AppState = {
  increment: {
    counter: 0
  }
}


export interface AppState {
  increment: IncrementState
}


export const KEY: ObjectKeys<AppState> = {
  increment: 'increment'
}


export interface IncrementState {
  counter: number
}
