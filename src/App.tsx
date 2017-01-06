import * as React from 'react'

const logo = require('./logo.svg')
import './app.css'

import { Increment } from './increment'
import { Disposer } from './lib/disposer'
import { getStore, initialState, KEY, AppState } from './store'


export class App extends React.Component<{}, Partial<AppState>> {
  private store = getStore()
  private dis = new Disposer()


  constructor(props) {
    super(props)
    this.state = initialState
  }


  componentDidMount() {
    this.dis.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment)
      .debounceTime(500)
      .subscribe(state => {
        this.setState({
          increment: state.increment,
        })
      })
  }


  componentWillUnmount() {
    this.dis.disposeSubscription()
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
