import { DENOMINATION_TYPES } from '@/entrypoints/content/modules/denomination/constants'
import { DenominationType } from '@/entrypoints/content/modules/denomination/types'

const OFFSET_CONFIG: Partial<Record<DenominationType, { offset: number; max: number }>> = {
  morale: { offset: 12, max: 10 },
  confidence: { offset: 23, max: 9 },
}

/**
 * Adjusts the raw denomination value to a normalized display value.
 *
 * Some denomination types have weird values. For example, 'morale' starts at 12, increases to 21, but the max value
 * is 11 instead of 22. This function normalizes such values to a simple range (e.g. 0-10).
 *
 * @param lt - The denomination type
 * @param ll - The raw denomination value from the URL
 * @returns The adjusted value for display
 */
export const adjustDenominationValue = (lt: DenominationType, ll: number): number => {
  const config = OFFSET_CONFIG[lt]
  if (!config) return ll

  const value = ll - config.offset
  return value === -1 ? config.max : value
}

/**
 * Check if a string is a valid denomination type.
 */
export const isDenominationType = (value: string): value is DenominationType =>
  DENOMINATION_TYPES.includes(value as DenominationType)
