import * as React from 'react'
import { Observable, Subscription } from 'rxjs'

const logo = require('./logo.svg')
import './App.css'

import { Disposer } from './disposer'
import { AppProps } from './index'
import { SimpleStore } from './simple-store'
import { initialState, KEY, AppState, IncrementState } from './state'


export class App extends React.Component<AppProps, AppState> {
  private store: SimpleStore<AppState>
  private dis = new Disposer()


  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = initialState
  }


  componentDidMount() {
    this.dis.disposable = this.store.getState()
      .filterByUpdatedKey(KEY.increment)
      .subscribe(state => {
        this.setState({
          increment: state.increment,
        })
      })
  }


  componentWillUnmount() {
    this.dis.disposeSubscription()
  }


  increment(event) {
    this.store.setState(KEY.increment, (p) => ({ counter: p.counter + 1 }))
      .then(state => this.store.setState(KEY.increment, incrementCallback))
      .then(state => this.store.setState(KEY.increment, Promise.resolve(incrementCallback)))
      .then(state => this.store.setState(KEY.increment, Observable.of(incrementCallback).delay(200)))
  }


  decrement(event) {
    this.store.setState(KEY.increment, (p) => ({ counter: p.counter - 1 }))
      .then(state => this.store.setState(KEY.increment, decrementCallback))
      .then(state => this.store.setState(KEY.increment, Promise.resolve(decrementCallback)))
      .then(state => this.store.setState(KEY.increment, Observable.of(decrementCallback).delay(200)))
  }


  reset(event) {
    this.store.setState(KEY.increment, { counter: 0 })
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <button onClick={(e) => this.increment(e)}>Increment</button>
        <button onClick={(e) => this.decrement(e)}>Decrement</button>
        <button onClick={(e) => this.reset(e)}>Reset</button>
        <h1>{this.state.increment.counter}</h1>
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
