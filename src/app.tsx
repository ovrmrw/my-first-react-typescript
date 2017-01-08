import * as React from 'react'

const logo = require('./logo.svg')
import './app.css'

import { StoreComponent } from './hoc'
import { Increment } from './increment'
import { KEY } from './store'


interface ComponentState {
  updatedTimes: {
    value: number,
    visible: boolean,
  }
}

const componentState: ComponentState = {
  updatedTimes: {
    value: 0,
    visible: false,
  }
}


export class App extends StoreComponent<{}, ComponentState> {
  constructor(props) {
    super(props)
    this.mergeStatesOnConstructor(componentState)
  }


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
          updatedTimes: {
            value: times,
            visible: times > 9,
          }
        })
      })
  }


  componentWillUnmount() {
    this.disposeSubscriptions()
  }


  render() {
    const s = this.state

    let updatedTimesElement: JSX.Element | null = null
    if (s.updatedTimes.visible) {
      updatedTimesElement = <div>store updated times: {s.updatedTimes.value}</div>
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React {s.increment.counter}</h2>
          {updatedTimesElement}
        </div>
        <Increment />
      </div>
    )
  }

}
