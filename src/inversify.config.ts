import { Container, decorate, injectable } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import { ReactiveStore, storeInstance } from './state'


const container = new Container({ defaultScope: 'Singleton' })
container.bind(ReactiveStore).toConstantValue(storeInstance)


export const rootContainer = container
export const { lazyInject } = getDecorators(container)
