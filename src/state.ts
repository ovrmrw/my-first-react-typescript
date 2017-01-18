import { getObjectKeys, getReactiveStoreAsSingleton, LoopType } from 'ovrmrw-reactive-store'


export const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
  other: 0,
}

export const KEY = getObjectKeys(initialState)

export const storeInstance = getReactiveStoreAsSingleton(initialState, {
  concurrent: 1,
  output: true,
  loopType: LoopType.asap,
})



export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
  other: number,
}


export interface IncrementState {
  counter: number,
}
