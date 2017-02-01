import * as React from 'react'

import { MyReactPureComponent } from './my-react.component'
import { ReactiveStoreService, AppState } from '../state'
import { lazyInject } from '../inversify.config'


export abstract class StoreComponent<P, S> extends MyReactPureComponent<P, AppState & S> {
  @lazyInject(ReactiveStoreService)
  protected store: ReactiveStoreService
}
