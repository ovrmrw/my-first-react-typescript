import * as React from 'react'
import { Subscription } from 'rxjs'

import { getStore, initialState, AppState } from './store'


export abstract class StoreComponent<P, S> extends React.PureComponent<P, Partial<AppState> & S> {
  store = getStore()

  private subs: Subscription[] = []

  set disposable(sub: Subscription) {
    this.subs.push(sub)
  }


  constructor(props?, context?) {
    super(props, context)
    this.state = initialState as any
  }


  disposeSubscriptions(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  abstract componentDidMount()

  abstract componentWillUnmount()

}
