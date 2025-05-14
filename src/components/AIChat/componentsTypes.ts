import { createElement, FunctionComponent, ReactNode } from 'react'

type ClassName = string

export type FcOrClassName<P> = FunctionComponent<P> | ClassName

export type BaseComponents = Record<string, FcOrClassName<any>>

export type DefaultComponents<T extends BaseComponents> = {
  [key in keyof T]: T[key] extends FcOrClassName<infer P>
    ? FunctionComponent<P & { className: string }>
    : never
}

export const renderComponent = <T extends BaseComponents, K extends keyof T>(
  defaultComponents: DefaultComponents<T>,
  userComponents: Partial<T> | undefined,
  key: K,
  props: T[K] extends FcOrClassName<infer P> ? P : never
): ReactNode => {
  const userComponent = userComponents?.[key]
  if (typeof userComponent === 'function') {
    const Component = userComponent as React.FunctionComponent<any>
    return createElement(Component, props)
  }

  // Default component handling
  const DefaultComponent = defaultComponents[
    key
  ] as React.FunctionComponent<any>
  return createElement(DefaultComponent, {
    ...(props as object),
    className: typeof userComponent === 'string' ? userComponent : '',
  })
}
