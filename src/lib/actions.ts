import { injectable, inject } from 'inversify'

import { ReactiveStore, KEY, AppState, IncrementState } from '../state'
import { container } from '../inversify.config'



@injectable()
export class Actions {
  constructor(
    @inject(ReactiveStore)
    private store: ReactiveStore<AppState>
  ) { }


  incrementCounter(): Promise<void> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter + 1 }))
      .then(() => this.store.setter(KEY.increment, incrementResolver))
      .then(() => this.store.setter(KEY.increment, (_, a) => Promise.resolve({ counter: a.increment.counter + 1 })))
      .then(() => this.store.setter(KEY.increment, Promise.resolve(incrementResolver)))
      .then(() => this.store.setter(KEY.increment, () => (q) => ({ counter: q.counter + 1 })))
      .then(() => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  decrementCounter(): Promise<void> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter - 1 }))
      .then(() => this.store.setter(KEY.increment, decrementResolver))
      .then(() => this.store.setter(KEY.increment, (_, a) => Promise.resolve({ counter: a.increment.counter - 1 })))
      .then(() => this.store.setter(KEY.increment, Promise.resolve(decrementResolver)))
      .then(() => this.store.setter(KEY.increment, () => (q) => ({ counter: q.counter - 1 })))
      .then(() => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  resetCounter(): Promise<void> {
    return this.store.setter(KEY.increment, { counter: this.store.initialState.increment.counter })
  }

}



function incrementResolver(state: IncrementState): IncrementState {
  return { counter: state.counter + 1 }
}


function decrementResolver(state: IncrementState): IncrementState {
  return { counter: state.counter - 1 }
}
