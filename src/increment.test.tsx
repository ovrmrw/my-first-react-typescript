import * as React from 'react'
import { shallow, mount, render } from 'enzyme'
import { Increment } from './increment'


it('renders without crashing', () => {
  shallow(<Increment />)
})
