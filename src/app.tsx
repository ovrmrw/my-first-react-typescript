import * as React from 'react'

const logo = require('./logo.svg')
import './app.css'

import { StoreComponent } from './HOC'
import { Increment } from './increment'
import { KEY, AppState } from './store'


export class App extends StoreComponent<{}, Partial<AppState>> {
  componentDidMount() {
    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment)
      .debounceTime(500)
      .subscribe(state => {
        this.setState({
          increment: state.increment,
        })
      })
  }


  componentWillUnmount() {
    this.disposeSubscriptions()
  }


  render() {
    const s = this.state as AppState

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React {s.increment.counter}</h2>
        </div>
        <Increment />
      </div>
    )
  }

}
