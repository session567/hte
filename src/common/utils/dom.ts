import { logger } from '@common/utils/logger'

/**
 * Find an element by its ID attribute.
 *
 * The native DOM method returns null without any feedback when elements aren't found. Since we almost always expect
 * queried elements to exist, this makes bugs hard to notice. This wrapper logs a warning when the element is missing,
 * making it immediately obvious when Hattrick changes their HTML or our selectors are incorrect.
 *
 * @param id - The element's ID
 * @param warn - Whether to log a warning if element is not found (default: true)
 * @returns The element, or null if not found
 */
export const getElementById = <T extends HTMLElement = HTMLElement>(id: string, warn = true): T | null => {
  const element = document.getElementById(id) as T | null
  if (warn && !element) logger.warn(`getElementById: ${id} not found`)

  return element
}

/**
 * Find all elements with the given name attribute.
 *
 * The native DOM method returns an empty NodeList without any feedback when elements aren't found. Since we almost
 * always expect queried elements to exist, this makes bugs hard to notice. This wrapper logs a warning when no
 * elements are found, making it immediately obvious when Hattrick changes their HTML or our selectors are incorrect.
 *
 * @param name - The name attribute value
 * @param warn - Whether to log a warning if no elements are found (default: true)
 * @returns A NodeList of matching elements (may be empty)
 */
export const getElementsByName = <T extends HTMLElement = HTMLElement>(name: string, warn = true): NodeListOf<T> => {
  const elements = document.getElementsByName(name) as NodeListOf<T>
  if (warn && !elements.length) logger.warn(`getElementsByName: ${name} not found`)

  return elements
}

/**
 * Find the first element matching the CSS selector.
 *
 * The native DOM method returns null without any feedback when elements aren't found. Since we almost always expect
 * queried elements to exist, this makes bugs hard to notice. This wrapper logs a warning when the element is missing,
 * making it immediately obvious when Hattrick changes their HTML or our selectors are incorrect.
 *
 * @param selectors - CSS selector string
 * @param warn - Whether to log a warning if element is not found (default: true)
 * @returns The first matching element, or null if not found
 */
export function querySelector<E extends Element = Element>(selectors: string, warn?: boolean): E | null
/**
 * Find the first element matching the CSS selector within a specific root element.
 *
 * The native DOM method returns null without any feedback when elements aren't found. Since we almost always expect
 * queried elements to exist, this makes bugs hard to notice. This wrapper logs a warning when the element is missing,
 * making it immediately obvious when Hattrick changes their HTML or our selectors are incorrect.
 *
 * @param root - The root element to search within
 * @param selectors - CSS selector string
 * @param warn - Whether to log a warning if element is not found (default: true)
 * @returns The first matching element, or null if not found
 */
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

/**
 * Find all elements matching the CSS selector.
 *
 * The native DOM method returns an empty NodeList without any feedback when elements aren't found. Since we almost
 * always expect queried elements to exist, this makes bugs hard to notice. This wrapper logs a warning when no
 * elements are found, making it immediately obvious when Hattrick changes their HTML or our selectors are incorrect.
 *
 * @param selectors - CSS selector string
 * @param warn - Whether to log a warning if no elements are found (default: true)
 * @returns A NodeList of matching elements (may be empty)
 */
export function querySelectorAll<E extends Element = Element>(selectors: string, warn?: boolean): NodeListOf<E>
/**
 * Find all elements matching the CSS selector within a specific root element.
 *
 * The native DOM method returns an empty NodeList without any feedback when elements aren't found. Since we almost
 * always expect queried elements to exist, this makes bugs hard to notice. This wrapper logs a warning when no
 * elements are found, making it immediately obvious when Hattrick changes their HTML or our selectors are incorrect.
 *
 * @param root - The root element to search within
 * @param selectors - CSS selector string
 * @param warn - Whether to log a warning if no elements are found (default: true)
 * @returns A NodeList of matching elements (may be empty)
 */
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

  const elements = root.querySelectorAll<E>(selectors)
  if (warn && !elements.length) logger.warn(`querySelectorAll: ${selectors} not found`)

  return elements
}
