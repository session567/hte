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
export const querySelector = <E extends Element = Element>(selectors: string, warn = true): E | null => {
  const element = document.querySelector<E>(selectors)
  if (warn && !element) logger.warn(`querySelector: ${selectors} not found`)

  return element
}

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
export const querySelectorIn = <E extends Element = Element>(
  root: Element,
  selectors: string,
  warn = true,
): E | null => {
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
export const querySelectorAll = <E extends Element = Element>(selectors: string, warn = true): NodeListOf<E> => {
  const elements = document.querySelectorAll<E>(selectors)
  if (warn && !elements.length) logger.warn(`querySelectorAll: ${selectors} not found`)

  return elements
}

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
export const querySelectorAllIn = <E extends Element = Element>(
  root: Element,
  selectors: string,
  warn = true,
): NodeListOf<E> => {
  const elements = root.querySelectorAll<E>(selectors)
  if (warn && !elements.length) logger.warn(`querySelectorAll: ${selectors} not found`)

  return elements
}

/**
 * Observe an element for DOM changes and run a callback when mutations occur.
 *
 * @param element - The element to observe for changes
 * @param callback - Function to execute when the element's children change
 */
export const observeElement = (element: Element, callback: () => void) => {
  const observer = new MutationObserver(() => {
    observer.disconnect()
    callback()
    observer.observe(element, { childList: true, subtree: true })
  })

  observer.observe(element, { childList: true, subtree: true })
}
