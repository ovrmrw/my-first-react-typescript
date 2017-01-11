import { getStore } from './store'
import { KEY, AppState, IncrementState } from './state'


class Actions {
  store = getStore()


  increment(): Promise<AppState> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter + 1 }))
      .then(s => this.store.setter(KEY.increment, incrementCallback))
      .then(s => this.store.setter(KEY.increment, Promise.resolve({ counter: s.increment.counter + 1 })))
      .then(s => this.store.setter(KEY.increment, Promise.resolve(incrementCallback)))
      .then(s => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  decrement(): Promise<AppState> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter - 1 }))
      .then(s => this.store.setter(KEY.increment, decrementCallback))
      .then(s => this.store.setter(KEY.increment, Promise.resolve({ counter: s.increment.counter - 1 })))
      .then(s => this.store.setter(KEY.increment, Promise.resolve(decrementCallback)))
      .then(s => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  reset(): Promise<AppState> {
    return this.store.setter(KEY.increment, { counter: 0 })
  }

}


export const actions = new Actions()



function incrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter + 1 }
}


function decrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter - 1 }
}
