// import { OpaqueToken } from '@angular/core'
import { Observable, Subject } from 'rxjs'


// export const StoreQueueConcurrent = new OpaqueToken('StoreQueueConcurrent')

// export const StoreInitialState = new OpaqueToken('StoreInitialState')


export interface Action {
  key: string,
  value: any,
  subject: Subject<any>,
}


type Value<T, K extends keyof T> =
  T[K] | Promise<T[K]> | Observable<T[K]>
type AsyncResolver<T, K extends keyof T> =
  (Promise<(value: T[K]) => T[K]>) | (Observable<(value: T[K]) => T[K]>)
type Resolver< T, K extends keyof T> =
  (value: T[K]) =>
    T[K] | Promise<T[K]> | Observable<T[K]>
type ResolverInResolver< T, K extends keyof T> =
  (value: T[K]) =>
    ((value: T[K]) => T[K]) | (Promise<(value: T[K]) => T[K]>) | (Observable<(value: T[K]) => T[K]>)

export type ValueOrResolver<T, K extends keyof T> =
  Value<T, K> | AsyncResolver<T, K> | Resolver<T, K> | ResolverInResolver<T, K>


type PartialValue<T, K extends keyof T> =
  Partial<T[K]> | Promise<Partial<T[K]>> | Observable<Partial<T[K]>>
type PartialAsyncResolver<T, K extends keyof T> =
  (Promise<(value: T[K]) => Partial<T[K]>>) | (Observable<(value: T[K]) => Partial<T[K]>>)
type PartialResolver<T, K extends keyof T> =
  (value: T[K]) =>
    Partial<T[K]> | Promise<Partial<T[K]>> | Observable<Partial<T[K]>>
type PartialResolverInResolver<T, K extends keyof T> =
  (value: T[K]) =>
    ((value: T[K]) => Partial<T[K]>) | (Promise<(value: T[K]) => Partial<T[K]>>) | (Observable<(value: T[K]) => Partial<T[K]>>)

export type PartialResolverSet<T, K extends keyof T> =
  PartialValue<T, K> | PartialAsyncResolver<T, K> | PartialResolver<T, K> | PartialResolverInResolver<T, K>


export function mergeObject<T>(obj: T, partials: Partial<{[P in keyof T]: T[P]}>[]): T {
  return partials.reduce<T>((p, partial) => {
    return { ...p as any, ...partial as any }
  }, obj)
}


export type ObjectKeys<T> = {[P in keyof T]: P}


export function getObjectKeys<T>(state: T): ObjectKeys<T> {
  return Object.keys(state).reduce((p, key) => {
    return { ...p, ...{ [key]: key } }
  }, {}) as any
}


export type ObjectKey<T, K extends keyof T> = K


export type RecursiveReadonly<T> = {
  readonly[P in keyof T]: RecursiveReadonly<T[P]>
}
