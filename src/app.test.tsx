import * as React from 'react'
import { shallow, mount, render, ShallowWrapper, ReactWrapper } from 'enzyme'

import { App } from './app'
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
  const original = App.prototype.componentWillMount
  App.prototype.componentWillMount = jest.fn()
  shallow(<App />)
  expect(App.prototype.componentWillMount).toBeCalled()
  App.prototype.componentWillMount = original
})


describe('App component test', () => {
  let wrapper: ShallowWrapper<any, any>
  let instance: App


  beforeEach(() => {
    container.bind(ReactiveStore).toConstantValue(new ReactiveStore(initialState, { testing: true }))

    wrapper = shallow(<App />)
    instance = wrapper.instance() as App
  })


  afterEach(() => {
    container.unbind(ReactiveStore)
  })


  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1)
  })
})


describe('App component & Increment component test', () => {
  let appWrapper: ShallowWrapper<any, any>
  let incrementWrapper: ShallowWrapper<any, any>
  let appInstance: App
  let incrementInstance: Increment


  beforeEach(() => {
    container.bind(ReactiveStore).toConstantValue(new ReactiveStore(initialState, { testing: true }))

    appWrapper = shallow(<App />)
    appInstance = appWrapper.instance() as App
    incrementWrapper = shallow(<Increment />)
    incrementInstance = incrementWrapper.instance() as Increment
  })


  afterEach(() => {
    container.unbind(ReactiveStore)
  })


  it('renders without crashing', () => {
    expect(appWrapper.length).toBe(1)
    expect(incrementWrapper.length).toBe(1)
  })


  it('welcome message is updated with delay', async () => {
    await incrementInstance.increment(null)
    jest.runTimersToTime(0)
    expect(appWrapper.find('h2').text()).toBe('Welcome to React 100')
    jest.runTimersToTime(400)
    expect(appWrapper.find('h2').text()).not.toBe('Welcome to React 105')
    jest.runTimersToTime(100)
    expect(appWrapper.find('h2').text()).toBe('Welcome to React 105')

    await incrementInstance.increment(null)
    jest.runTimersToTime(400)
    expect(appWrapper.find('h2').text()).not.toBe('Welcome to React 110')
    jest.runTimersToTime(100)
    expect(appWrapper.find('h2').text()).toBe('Welcome to React 110')
  })
})
