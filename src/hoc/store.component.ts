import * as React from 'react'
import { Subscription } from 'rxjs'

import { MyReactPureComponent } from './my-react.component'
import { initialState, storeInstance, AppState } from '../state'


export abstract class StoreComponent<P, S> extends MyReactPureComponent<P, AppState & S> {
  store = storeInstance


  constructor(props?, context?) {
    super(props, context)
    this.state = { ...initialState as any }
  }

}
