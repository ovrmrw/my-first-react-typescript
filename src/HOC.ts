import * as React from 'react'
import { Subscription } from 'rxjs'

import { Disposer } from './lib/disposer'
import { getStore, initialState, AppState } from './store'


export class StoreComponent<P, S> extends React.Component<P, Partial<AppState>> {
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

}
