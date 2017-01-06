import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './App'
import './index.css'

import { SimpleStore } from './simple-store'
import { AppState, initialState } from './state'


export interface AppProps {
  store: SimpleStore<AppState>
}

const props: AppProps = {
  store: new SimpleStore<AppState>(initialState),
}


ReactDOM.render(
  <App {...props} />,
  document.getElementById('root')
)
