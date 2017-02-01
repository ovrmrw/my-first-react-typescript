import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import { ReactiveStoreService, storeInstance } from './state'


const container = new Container({ defaultScope: 'Singleton' })
container.bind(ReactiveStoreService).toConstantValue(storeInstance)
export const { lazyInject } = getDecorators(container)
