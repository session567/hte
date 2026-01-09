declare const __VERSION__: string
declare const __DEV__: boolean | undefined

export const VERSION = __VERSION__

export const IS_DEV_MODE = typeof __DEV__ !== 'undefined' && __DEV__

export const DAYS_PER_SEASON = 112
export const DAYS_PER_WEEK = 7
export const WEEKS_PER_SEASON = DAYS_PER_SEASON / DAYS_PER_WEEK
