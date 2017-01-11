import * as React from 'react'

import { StoreComponent } from './hoc'
import { actions, KEY } from './store'


export class Increment extends StoreComponent<{}, {}> {
  componentDidMount() {
    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment, KEY.lastUpdated)
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


  increment(event): void {
    actions.increment()
  }


  decrement(event): void {
    actions.decrement()
  }


  reset(event): void {
    actions.reset()
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
