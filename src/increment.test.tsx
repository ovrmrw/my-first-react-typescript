import * as React from 'react'
import { shallow, mount, render, ShallowWrapper } from 'enzyme'

import { Increment } from './increment'
import { ReactiveStore, AppState } from './state'
import { rootContainer } from './inversify.config'


const initialState: AppState = {
  increment: {
    counter: 100,
  },
  lastUpdated: 0,
  other: 0,
}

rootContainer.unbind(ReactiveStore)
rootContainer.bind(ReactiveStore).toConstantValue(new ReactiveStore(initialState, { output: false, testing: true }))


describe('Increment component test', () => {
  let wrapper: ShallowWrapper<any, any>
  let instance: Increment


  beforeEach(async () => {
    wrapper = shallow(<Increment />)
    instance = wrapper.instance() as Increment
  })


  afterEach(async () => {
    await instance.store.forceResetForTesting()
  })


  it('renders without crashing', () => {
    shallow(<Increment />)
  })


  it('increment', async () => {
    await instance.increment(null)

    await new Promise(setTimeout)
    expect(instance.state.increment.counter).toBe(105)
    expect(wrapper.find('h1').text()).toBe('105')
  })


  it('decrement', async () => {
    await instance.decrement(null)

    await new Promise(setTimeout)
    expect(instance.state.increment.counter).toBe(95)
    expect(wrapper.find('h1').text()).toBe('95')
  })


  it('reset', async () => {
    await instance.increment(null)
    await instance.increment(null)
    await instance.reset(null)

    await new Promise(setTimeout)
    expect(instance.state.increment.counter).toBe(100)
    expect(wrapper.find('h1').text()).toBe('100')
  })

})
