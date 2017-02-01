import * as React from 'react'
import { Subscription } from 'rxjs'


export abstract class MyReactPureComponent<P, S> extends React.PureComponent<P, S> {
  private subs: Subscription[] = []

  set disposable(sub: Subscription) {
    this.subs.push(sub)
  }


  mergeStatesOnConstructor(...states: Partial<S>[]): void {
    const tempState = states.reduce((p, s) => {
      return { ...p, ...s as any }
    }, {})
    this.state = { ...this.state as any, ...tempState }
  }


  disposeSubscriptions(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  abstract componentWillMount()

  abstract componentWillUnmount()

}
