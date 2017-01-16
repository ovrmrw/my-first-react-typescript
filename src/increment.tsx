import * as React from 'react'
import { Observable } from 'rxjs'

import { StoreComponent } from './hoc'
import { IncrementState, incrementKey, lastUpdatedKey } from './store'


export class Increment extends StoreComponent<{}, {}> {
  componentDidMount() {
    this.disposable = this.store.getter()
      .filterByUpdatedKey(incrementKey, lastUpdatedKey)
      .debounceTime(0)
      .subscribe(state => {
        this.setState({
          increment: state.increment,
          lastUpdated: state.lastUpdated,
        })
      })
  }


  componentWillUnmount() {
    this.disposeSubscriptions()
  }


  increment(event): Promise<any> {
    return this.store.setter(incrementKey, (p) => ({ counter: p.counter + 1 }))
      .then(s => this.store.setter(incrementKey, incrementResolver))
      .then(s => this.store.setter(incrementKey, Promise.resolve({ counter: s.increment.counter + 1 })))
      .then(s => this.store.setter(incrementKey, Promise.resolve(incrementResolver)))
      .then(s => this.store.setter(incrementKey, () => (q) => ({ counter: q.counter + 1 })))
      .then(s => this.store.setter(lastUpdatedKey, new Date().getTime()))
  }


  decrement(event): Promise<any> {
    return this.store.setter(incrementKey, (p) => ({ counter: p.counter - 1 }))
      .then(s => this.store.setter(incrementKey, decrementResolver))
      .then(s => this.store.setter(incrementKey, Promise.resolve({ counter: s.increment.counter - 1 })))
      .then(s => this.store.setter(incrementKey, Promise.resolve(decrementResolver)))
      .then(s => this.store.setter(incrementKey, () => (q) => ({ counter: q.counter - 1 })))
      .then(s => this.store.setter(lastUpdatedKey, new Date().getTime()))
  }


  reset(event): Promise<any> {
    return this.store.setter(incrementKey, { counter: 0 })
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
