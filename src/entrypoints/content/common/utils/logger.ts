import { IS_DEV_MODE } from '@/entrypoints/content/common/utils/constants'

const PREFIX = '[HTE]'

/**
 * Console logger that prefixes all messages with "[HTE]" and logs debug messages only in dev mode.
 *
 * Use this instead of console.log/warn/error directly.
 */
export const logger = {
  /**
   * Log a debug message (only if dev mode is enabled).
   *
   * @param args - Values to log
   */
  debug: (...args: unknown[]): void => {
    if (!IS_DEV_MODE) return
    console.log(PREFIX, ...args)
  },

  /**
   * Log a warning message.
   *
   * @param args - Values to log
   */
  warn: (...args: unknown[]): void => {
    console.warn(PREFIX, ...args)
  },

  /**
   * Log an error message.
   *
   * @param args - Values to log
   */
  error: (...args: unknown[]): void => {
    console.error(PREFIX, ...args)
  },
}
