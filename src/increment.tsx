import * as React from 'react'

import { MyReactPureComponent } from './hoc'
import { ReactiveStoreService, KEY, AppState, IncrementState } from './state'
import { lazyInject } from './container'


export class Increment extends MyReactPureComponent<{}, AppState> {
  @lazyInject(ReactiveStoreService)
  store: ReactiveStoreService


  componentWillMount() {
    this.store.getter().take(1).subscribe(state => this.setState({ ...state }))

    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment, KEY.lastUpdated)
      .debounceTime(0)
      .subscribe(state => {
        this.setState({ ...state })
        this.forceUpdate()
      })
  }


  componentWillUnmount() {
    this.disposeSubscriptions()
  }


  increment(event): Promise<any> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter + 1 }))
      .then(() => this.store.setter(KEY.increment, incrementResolver))
      .then(() => this.store.setter(KEY.increment, (_, a) => Promise.resolve({ counter: a.increment.counter + 1 })))
      .then(() => this.store.setter(KEY.increment, Promise.resolve(incrementResolver)))
      .then(() => this.store.setter(KEY.increment, () => (q) => ({ counter: q.counter + 1 })))
      .then(() => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  decrement(event): Promise<any> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter - 1 }))
      .then(() => this.store.setter(KEY.increment, decrementResolver))
      .then(() => this.store.setter(KEY.increment, (_, a) => Promise.resolve({ counter: a.increment.counter - 1 })))
      .then(() => this.store.setter(KEY.increment, Promise.resolve(decrementResolver)))
      .then(() => this.store.setter(KEY.increment, () => (q) => ({ counter: q.counter - 1 })))
      .then(() => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  reset(event): Promise<any> {
    return this.store.setter(KEY.increment, { counter: 0 })
  }


  render() {
    const s = this.state

    return (
      <div>
        <button onClick={(e) => this.increment(e)}>Increment</button>
        <button onClick={(e) => this.decrement(e)}>Decrement</button>
        <button onClick={(e) => this.reset(e)}>Reset</button>
        <h1>{s.increment.counter}</h1>
        <div>lastUpdated: {s.lastUpdated}</div>
      </div>
    )
  }

}



function incrementResolver(state: IncrementState): IncrementState {
  return { counter: state.counter + 1 }
}


function decrementResolver(state: IncrementState): IncrementState {
  return { counter: state.counter - 1 }
}
