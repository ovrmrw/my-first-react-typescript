import { SimpleStore } from '../lib/simple-store'
import { initialState, AppState } from './state'


let store: SimpleStore<AppState>


export function getStore(): SimpleStore<AppState> {
  if (!store) {
    store = new SimpleStore<AppState>(initialState)
  }
  return store
}
