import { logger } from '@common/utils/logger'

export const getElementById = <T extends HTMLElement = HTMLElement>(id: string, warn = true): T | null => {
  const element = document.getElementById(id) as T | null
  if (warn && !element) logger.warn(`getElementById: ${id} not found`)

  return element
}

export const getElementsByName = <T extends HTMLElement = HTMLElement>(name: string, warn = true): NodeListOf<T> => {
  const nodes = document.getElementsByName(name) as NodeListOf<T>
  if (warn && !nodes.length) logger.warn(`getElementsByName: ${name} not found`)

  return nodes
}

export function querySelector<E extends Element = Element>(selectors: string, warn?: boolean): E | null
export function querySelector<E extends Element = Element>(
  root: ParentNode,
  selectors: string,
  warn?: boolean,
): E | null
export function querySelector<E extends Element = Element>(
  rootOrSelectors: ParentNode | string,
  selectorsOrWarn?: string | boolean,
  warnParam?: boolean,
): E | null {
  const isRootProvided = typeof rootOrSelectors !== 'string'
  const root = isRootProvided ? rootOrSelectors : document
  const selectors = isRootProvided ? (selectorsOrWarn as string) : rootOrSelectors
  const warn = isRootProvided ? (warnParam ?? true) : (selectorsOrWarn ?? true)

  const element = root.querySelector<E>(selectors)
  if (warn && !element) logger.warn(`querySelector: ${selectors} not found`)

  return element
}

export function querySelectorAll<E extends Element = Element>(selectors: string, warn?: boolean): NodeListOf<E>
export function querySelectorAll<E extends Element = Element>(
  root: ParentNode,
  selectors: string,
  warn?: boolean,
): NodeListOf<E>
export function querySelectorAll<E extends Element = Element>(
  rootOrSelectors: ParentNode | string,
  selectorsOrWarn?: string | boolean,
  warnParam?: boolean,
): NodeListOf<E> {
  const isRootProvided = typeof rootOrSelectors !== 'string'
  const root = isRootProvided ? rootOrSelectors : document
  const selectors = isRootProvided ? (selectorsOrWarn as string) : rootOrSelectors
  const warn = isRootProvided ? (warnParam ?? true) : (selectorsOrWarn ?? true)

  const nodes = root.querySelectorAll<E>(selectors)
  if (warn && !nodes.length) logger.warn(`querySelectorAll: ${selectors} not found`)

  return nodes
}
