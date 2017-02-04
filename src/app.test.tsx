import * as React from 'react'
import { shallow, mount, render, ShallowWrapper, ReactWrapper } from 'enzyme'

import { App } from './app'
import { Increment } from './increment'
import { ReactiveStore, AppState } from './state'
import { Actions } from './lib/actions'
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


describe('App component & Actions test', () => {
  let wrapper: ShallowWrapper<any, any>
  let instance: App
  let actions: Actions


  beforeEach(() => {
    container.bind(ReactiveStore).toConstantValue(new ReactiveStore(initialState, { testing: true }))

    wrapper = shallow(<App />)
    instance = wrapper.instance() as App
    actions = container.get(Actions)
  })


  afterEach(() => {
    container.unbind(ReactiveStore)
  })


  it('welcome message is updated with delay', async () => {
    expect(wrapper.find('h2').text()).toBe('Welcome to React 100')

    await actions.incrementCounter()
    jest.runTimersToTime(499)
    expect(wrapper.find('h2').text()).not.toBe('Welcome to React 105')
    jest.runTimersToTime(1)
    expect(wrapper.find('h2').text()).toBe('Welcome to React 105')

    await actions.incrementCounter()
    jest.runTimersToTime(499)
    expect(wrapper.find('h2').text()).not.toBe('Welcome to React 110')
    jest.runTimersToTime(1)
    expect(wrapper.find('h2').text()).toBe('Welcome to React 110')
  })
})
