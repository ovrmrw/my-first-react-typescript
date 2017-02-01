import { ReactiveStore, getObjectKeys, getReactiveStoreAsSingleton, LoopType } from 'ovrmrw-reactive-store'
export { ReactiveStore }


export const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
  other: 0,
}


export const KEY = getObjectKeys(initialState)

export const storeInstance = getReactiveStoreAsSingleton(initialState, {
  concurrent: Number.POSITIVE_INFINITY,
  output: true,
  // useFreeze: true,
})

// export class ReactiveStoreService extends ReactiveStore<AppState> { }



export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
  other: number,
}


export interface IncrementState {
  counter: number,
}
