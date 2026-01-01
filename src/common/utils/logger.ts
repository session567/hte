declare const __DEV__: boolean | undefined

const isDevMode = typeof __DEV__ !== 'undefined' && __DEV__

export const createLogger = (moduleName?: string) => {
  const prefix = moduleName ? `[HTE][${moduleName}]` : '[HTE]'

  return {
    debug: (...args: unknown[]) => isDevMode && console.log(prefix, ...args),
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    error: (...args: unknown[]) => console.error(prefix, ...args),
  }
}

export type Logger = ReturnType<typeof createLogger>
