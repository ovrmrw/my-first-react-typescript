import * as React from 'react'

const logo = require('./logo.svg')
import './app.css'

import { StoreComponent } from './HOC'
import { Increment } from './increment'
import { KEY, AppState } from './store'


interface StateForThisComponent {
  x: number
}


export class App extends StoreComponent<{}, StateForThisComponent> {
  componentDidMount() {
    let x = 0

    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment)
      .debounceTime(500)
      .subscribe(state => {
        this.setState({
          increment: state.increment,
          x: x++,
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
          <div>x: {s.x}</div>
        </div>
        <Increment />
      </div>
    )
  }

}
