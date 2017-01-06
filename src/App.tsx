import * as React from 'react'

const logo = require('./logo.svg')
import './App.css'

import { Disposer } from './lib/disposer'
import { getStore, initialState, KEY, AppState, IncrementState } from './store'


export class App extends React.Component<{}, Partial<AppState>> {
  private store = getStore()
  private dis = new Disposer()


  constructor(props) {
    super(props)
    this.state = initialState
  }


  componentDidMount() {
    this.dis.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment, KEY.lastUpdated)
      .subscribe(state => {
        this.setState({
          increment: state.increment,
          lastUpdated: state.lastUpdated,
        })
      })
  }


  componentWillUnmount() {
    this.dis.disposeSubscription()
  }


  increment(event): Promise<any> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter + 1 }))
      .then(s => this.store.setter(KEY.increment, incrementCallback))
      .then(s => this.store.setter(KEY.increment, Promise.resolve({ counter: s.increment.counter + 1 })))
      .then(s => this.store.setter(KEY.increment, Promise.resolve(incrementCallback)))
      .then(s => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  decrement(event): Promise<any> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter - 1 }))
      .then(s => this.store.setter(KEY.increment, decrementCallback))
      .then(s => this.store.setter(KEY.increment, Promise.resolve({ counter: s.increment.counter - 1 })))
      .then(s => this.store.setter(KEY.increment, Promise.resolve(decrementCallback)))
      .then(s => this.store.setter(KEY.lastUpdated, new Date().getTime()))

  }


  reset(event): Promise<any> {
    return this.store.setter(KEY.increment, { counter: 0 })
  }


  render() {
    const state = this.state as AppState

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <button onClick={(e) => this.increment(e)}>Increment</button>
        <button onClick={(e) => this.decrement(e)}>Decrement</button>
        <button onClick={(e) => this.reset(e)}>Reset</button>
        <h1>{state.increment.counter}</h1>
        <div>lastUpdated: {state.lastUpdated}</div>
      </div>
    )
  }

}



function incrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter + 1 }
}


function decrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter - 1 }
}
