import { ObjectKey } from '../lib/simple-store'


export const initialState: AppState = {
  increment: {
    counter: 0,
    // other: 9,
  },
  lastUpdated: 0,
  other: 0,
}


export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
  other: number,
}


// export const KEY: ObjectKeys<AppState> = {
//   increment: 'increment',
//   lastUpdated: 'lastUpdated',
//   other: 'other',
// }
export const incrementKey: ObjectKey<AppState, 'increment'> = 'increment'
export const lastUpdatedKey: ObjectKey<AppState, 'lastUpdated'> = 'lastUpdated'
export const otherKey: ObjectKey<AppState, 'other'> = 'other'


export interface IncrementState {
  counter: number,
  // other: number,
}
