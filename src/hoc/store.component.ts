import * as React from 'react'

import { MyReactPureComponent } from './my-react.component'
import { ReactiveStore, AppState } from '../state'
import { lazyInject } from '../inversify.config'


export abstract class StoreComponent<P, S> extends MyReactPureComponent<P, AppState & S> {
  @lazyInject(ReactiveStore)
  protected store: ReactiveStore<AppState>
}
