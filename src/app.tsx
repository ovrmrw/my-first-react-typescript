import * as React from 'react'

const logo = require('./logo.svg')
import './app.css'

import { StoreComponent } from './HOC'
import { Increment } from './increment'
import { KEY, AppState } from './store'


interface StateForThisComponent {
  updatedTimes: number
}


export class App extends StoreComponent<{}, Partial<StateForThisComponent>> {
  componentDidMount() {
    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment)
      .debounceTime(500)
      .subscribe(state => {
        this.setState({
          increment: state.increment,
        })
      })

    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment, KEY.lastUpdated)
      .scan((p, _) => p + 1, 0)
      .subscribe(times => {
        this.setState({
          updatedTimes: times,
        })
      })
  }


  componentWillUnmount() {
    this.disposeSubscriptions()
  }


  render() {
    const s = this.state as AppState & StateForThisComponent

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React {s.increment.counter}</h2>
          <div>store updated times: {s.updatedTimes}</div>
        </div>
        <Increment />
      </div>
    )
  }

}
