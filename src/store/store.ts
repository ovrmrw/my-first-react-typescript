import { ReactiveStore } from 'ovrmrw-reactive-store'
import { initialState, AppState } from './state'


let store: ReactiveStore<AppState>


export function getStore(): ReactiveStore<AppState> {
  if (!store) {
    store = new ReactiveStore<AppState>(initialState)
  }
  return store
}
