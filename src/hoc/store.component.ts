import * as React from 'react'
import { Subscription } from 'rxjs'

import { MyReactPureComponent } from './my-react.component'
import { getStore, initialState, AppState } from '../store'


export abstract class StoreComponent<P, S> extends MyReactPureComponent<P, AppState & S> {
  store = getStore()


  constructor(props?, context?) {
    super(props, context)
    this.state = { ...initialState as any }
  }

}
