declare const __DEV__: boolean | undefined

const IS_DEV_MODE = typeof __DEV__ !== 'undefined' && __DEV__
const PREFIX = '[HTE]'

export const logger = {
  debug: (...args: unknown[]): void => {
    if (IS_DEV_MODE) return
    console.log(PREFIX, ...args)
  },
  warn: (...args: unknown[]): void => {
    console.warn(PREFIX, ...args)
  },
  error: (...args: unknown[]): void => {
    console.error(PREFIX, ...args)
  },
}
