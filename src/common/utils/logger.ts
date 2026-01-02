declare const __DEV__: boolean | undefined

const IS_DEV_MODE = typeof __DEV__ !== 'undefined' && __DEV__
const PREFIX = '[HTE]'

export const logger = {
  debug: (...args: unknown[]) => IS_DEV_MODE && console.log(PREFIX, ...args),
  warn: (...args: unknown[]) => console.warn(PREFIX, ...args),
  error: (...args: unknown[]) => console.error(PREFIX, ...args),
}
