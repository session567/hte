/**
 * Format a number as a percentage string.
 *
 * @example formatPercentage(0.43) // "0,43%"
 * @example formatPercentage(69) // "69%"
 */
export const formatPercentage = (value: number): string => {
  const fixed = value.toFixed(2)
  return `${parseFloat(fixed)}%`.replace('.', ',')
}
