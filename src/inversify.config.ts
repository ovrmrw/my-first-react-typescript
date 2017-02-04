import { Container, decorate, injectable } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import { ReactiveStore, storeInstance } from './state'


const rootContainer = new Container()
rootContainer.bind(ReactiveStore).toConstantValue(storeInstance)


export const container = rootContainer.createChild()

export const { lazyInject, lazyMultiInject } = getDecorators(container)
