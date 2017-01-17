import * as React from 'react'
import { Subscription } from 'rxjs'
import { getReactiveStoreAsSingleton } from 'ovrmrw-reactive-store'

import { MyReactPureComponent } from './my-react.component'
import { initialState, AppState } from '../state'


export abstract class StoreComponent<P, S> extends MyReactPureComponent<P, AppState & S> {
  store = getReactiveStoreAsSingleton(initialState)


  constructor(props?, context?) {
    super(props, context)
    this.state = { ...initialState as any }
  }

}
