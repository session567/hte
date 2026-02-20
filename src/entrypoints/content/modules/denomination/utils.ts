import { DENOMINATION_TYPES, MAX_VALUES } from '@/entrypoints/content/modules/denomination/constants'
import { DenominationType } from '@/entrypoints/content/modules/denomination/types'

const DENOMINATION_CONFIG: Partial<Record<DenominationType, { offset?: number; max?: number; reverse?: boolean }>> = {
  morale: { offset: -12, max: 10 },
  confidence: { offset: -23, max: 9 },
  aggressiveness: { reverse: true }, // TODO: This should be a setting
}

/**
 * Adjusts a raw denomination value to a normalized display value.
 *
 * Handles three types of transformations:
 * - Reverse: inverts the scale.
 * - Offset: adjusts values that don't start at 0 (e.g. morale: 12-21 → 0-9).
 * - Max: maps -1 to the maximum display value (e.g. morale starts at 12 and increases to 21, but the raw max is stored
 *   as -1. We first apply the offset of -12, after which the max becomes -1, then remap it to the true max value).
 *
 * @param lt - The denomination type
 * @param ll - The raw denomination value from the URL
 * @returns The adjusted value for display
 */
export const adjustDenominationValue = (lt: DenominationType, ll: number): number => {
  const config = DENOMINATION_CONFIG[lt]
  if (!config) return ll

  let value = ll
  if (config.reverse) value = MAX_VALUES[lt] - value
  if (config.offset !== undefined) value += config.offset
  if (config.max && value === -1) value = config.max

  return value
}

/**
 * Check if a string is a valid denomination type.
 */
export const isDenominationType = (value: string): value is DenominationType =>
  DENOMINATION_TYPES.includes(value as DenominationType)
