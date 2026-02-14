/**
 * Check if a given value is null or undefined.
 *
 * @param value - The value to check
 */
export const isNil = (value: unknown): value is null | undefined => {
  return value == null
}
