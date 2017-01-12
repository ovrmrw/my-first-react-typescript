// import { Injectable, NgZone, Inject, Optional } from '@angular/core'
require('setimmediate')
const asap = require('asap')
import { Observable, Subject, BehaviorSubject } from 'rxjs'

import { Action, ValueOrResolver, RecursiveReadonly } from './common'

import './add/operator/all'

export const latestUpdatedKey = '__latest__'


// @Injectable()
export class SimpleStore<T> {
  private simpleStore$ = new Subject<Action>()
  private provider$: BehaviorSubject<T | RecursiveReadonly<T>>


  constructor(
    private initialState: T,
    private concurrent?: number,
  ) {
    this.provider$ = new BehaviorSubject<T>(initialState || {} as T)
    this.createStore()
    this.applyEffectors()
  }


  private createStore(): void {
    const queue$ =
      this.simpleStore$
        .mergeMap(action => {
          if (action.value instanceof Promise || action.value instanceof Observable) {
            return Observable.from(action.value)
              .mergeMap(value => Observable.of(Object.assign(action, { value })))
          } else {
            return Observable.of(action)
          }
        }, (this.concurrent || 1))

    const reduced$ =
      queue$
        .scan((state, action) => {
          if (action.value instanceof Function) {
            state[action.key] = action.value.call(null, state[action.key])
          } else {
            state[action.key] = action.value
          }
          state[latestUpdatedKey] = action.key
          const newState = Object.assign({}, state)
          // setImmediate(() => {
          //   action.subject.next(newState)
          // })
          asap(() => {
            action.subject.next(newState)
          })
          return newState
        }, this.initialState as T)

    reduced$
      .subscribe(newState => {
        console.log('newState:', newState)
        // this.zone.run(() => {
        this.provider$.next(newState)
        // })
        this.effectAfterReduced(newState)
      })
  }


  private effectAfterReduced(state: T): void {

  }


  private applyEffectors(): void {

  }


  setter<K extends keyof T>(key: K, value: ValueOrResolver<T, K>): Promise<T> { // TをRecursiveReadonly<T>にするとプロパティ名の一斉リネームが出来なくなる。
    const subject = new Subject<T | RecursiveReadonly<T>>()
    this.simpleStore$.next({ key, value, subject })
    return subject.take(1).toPromise()
  }


  getter(): Observable<T> { // TをRecursiveReadonly<T>にするとプロパティ名の一斉リネームが出来なくなる。
    return this.provider$
  }


  getterAsPromise(): Promise<T> { // TをRecursiveReadonly<T>にするとプロパティ名の一斉リネームが出来なくなる。
    return this.provider$.take(1).toPromise()
  }

}
