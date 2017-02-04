import * as React from 'react'
import { shallow, mount, render, ShallowWrapper, ReactWrapper } from 'enzyme'

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


jest.useFakeTimers()


test('componentWillMount is called', () => {
  const original = Increment.prototype.componentWillMount
  Increment.prototype.componentWillMount = jest.fn()
  shallow(<Increment />)
  expect(Increment.prototype.componentWillMount).toBeCalled()
  Increment.prototype.componentWillMount = original
})


describe('Increment component test', () => {
  let wrapper: ReactWrapper<any, any>
  let instance: Increment


  beforeEach(() => {
    container.bind(ReactiveStore).toConstantValue(new ReactiveStore(initialState, { testing: true }))

    wrapper = mount(<Increment />)
    instance = wrapper.instance() as Increment
  })


  afterEach(() => {
    container.unbind(ReactiveStore)
  })


  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1)
  })


  it('increment function is called with button click', async () => {
    instance.increment = jest.fn()
    wrapper.find('button.increment').simulate('click')
    expect(instance.increment).toBeCalled()
  })


  it('increment function is executed', async () => {
    await instance.increment(null)
    jest.runTimersToTime(0)
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
    jest.runTimersToTime(0)
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
    jest.runTimersToTime(0)
    expect(instance.state.increment.counter).toBe(100)
    expect(wrapper.find('h1').text()).toBe('100')
  })

})
