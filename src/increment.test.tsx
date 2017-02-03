import * as React from 'react'
import { shallow, mount, render, ShallowWrapper } from 'enzyme'

import { Increment } from './increment'
import { ReactiveStore, AppState } from './state'
import { container } from './inversify.config'


const initialState: AppState = {
  increment: {
    counter: 100,
  },
  lastUpdated: 0,
  other: 0,
}

container.unbind(ReactiveStore)
container.bind(ReactiveStore).toConstantValue(new ReactiveStore(initialState, { output: false, testing: true }))


jest.useFakeTimers()


describe('Increment component test', () => {
  let wrapper: ShallowWrapper<any, any>
  let instance: Increment


  beforeEach(async () => {
    wrapper = shallow(<Increment />)
    instance = wrapper.instance() as Increment
    await instance.store.forceResetForTesting()
  })


  it('renders without crashing', () => {
    shallow(<Increment />)
  })


  it('increment function is called with button click', async () => {
    instance.increment = jest.fn()
    wrapper.find('button.increment').simulate('click')
    expect(instance.increment).toBeCalled()
  })


  it('increment function is executed', async () => {
    await instance.increment(null)
    jest.runAllTimers()
    expect(instance.state.increment.counter).toBe(105)
    expect(wrapper.find('h1').text()).toBe('105')
  })


  it('decrement function is called with button click', async () => {
    instance.decrement = jest.fn()
    wrapper.find('button.decrement').simulate('click')
    expect(instance.decrement).toBeCalled()
  })


  it('decrement function is executed', async () => {
    await instance.decrement(null)
    jest.runAllTimers()
    expect(instance.state.increment.counter).toBe(95)
    expect(wrapper.find('h1').text()).toBe('95')
  })


  it('reset function is called with button click', async () => {
    instance.reset = jest.fn()
    wrapper.find('button.reset').simulate('click')
    expect(instance.reset).toBeCalled()
  })


  it('reset function is executed', async () => {
    await instance.increment(null)
    await instance.increment(null)
    await instance.reset(null)
    jest.runAllTimers()
    expect(instance.state.increment.counter).toBe(100)
    expect(wrapper.find('h1').text()).toBe('100')
  })

})
