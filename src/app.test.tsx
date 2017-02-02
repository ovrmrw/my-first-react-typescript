import * as React from 'react'
import { shallow, mount, render } from 'enzyme'
import { App } from './app'


it('renders without crashing', () => {
  shallow(<App />)
})
