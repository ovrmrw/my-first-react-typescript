import * as React from 'react'
import { Subscription } from 'rxjs'

import { getStore, initialState, AppState } from './store'


export abstract class StoreComponent<P, S> extends React.PureComponent<P, Partial<AppState>> {
  store = getStore()

  private subs: Subscription[] = []

  set disposable(sub: Subscription) {
    this.subs.push(sub)
  }


  constructor(props?, context?) {
    super(props, context)
    this.state = initialState
  }


  disposeSubscriptions(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  abstract componentDidMount()

  abstract componentWillUnmount()

}
