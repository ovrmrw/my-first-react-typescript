import * as React from 'react'

import { MyReactPureComponent } from './hoc'
import { ReactiveStore, KEY, AppState, IncrementState } from './state'
import { Actions } from './lib/actions'
import { lazyInject } from './inversify.config'


export class Increment extends MyReactPureComponent<{}, AppState> {
  @lazyInject(ReactiveStore)
  store: ReactiveStore<AppState>
  @lazyInject(Actions)
  actions: Actions


  constructor(props) {
    super(props)
    this.state = { ...this.store.initialState }
  }


  componentWillMount() {
    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment, KEY.lastUpdated)
      .debounceTime(0)
      .subscribe(state => this.setState({ ...state }))
  }


  componentWillUnmount() {
    this.disposeSubscriptions()
  }


  increment(event): Promise<void> {
    // return this.store.setter(KEY.increment, (p) => ({ counter: p.counter + 1 }))
    //   .then(() => this.store.setter(KEY.increment, incrementResolver))
    //   .then(() => this.store.setter(KEY.increment, (_, a) => Promise.resolve({ counter: a.increment.counter + 1 })))
    //   .then(() => this.store.setter(KEY.increment, Promise.resolve(incrementResolver)))
    //   .then(() => this.store.setter(KEY.increment, () => (q) => ({ counter: q.counter + 1 })))
    //   .then(() => this.store.setter(KEY.lastUpdated, new Date().getTime()))
    return this.actions.incrementCounter()
  }


  decrement(event): Promise<any> {
    // return this.store.setter(KEY.increment, (p) => ({ counter: p.counter - 1 }))
    //   .then(() => this.store.setter(KEY.increment, decrementResolver))
    //   .then(() => this.store.setter(KEY.increment, (_, a) => Promise.resolve({ counter: a.increment.counter - 1 })))
    //   .then(() => this.store.setter(KEY.increment, Promise.resolve(decrementResolver)))
    //   .then(() => this.store.setter(KEY.increment, () => (q) => ({ counter: q.counter - 1 })))
    //   .then(() => this.store.setter(KEY.lastUpdated, new Date().getTime()))
    return this.actions.decrementCounter()
  }


  reset(event): Promise<any> {
    // return this.store.setter(KEY.increment, { counter: this.store.initialState.increment.counter })
    return this.actions.resetCounter()
  }


  render() {
    const s = this.state

    return (
      <div>
        <button className="increment" onClick={(e) => this.increment(e)}>Increment</button>
        <button className="decrement" onClick={(e) => this.decrement(e)}>Decrement</button>
        <button className="reset" onClick={(e) => this.reset(e)}>Reset</button>
        <h1>{s.increment.counter}</h1>
        <div>lastUpdated: {s.lastUpdated}</div>
      </div>
    )
  }

}
