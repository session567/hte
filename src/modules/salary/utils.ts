// Matches: [salary] [currency]/week
const REGEX_WEEKLY_SALARY_AND_CURRENCY = /^([\d\s]+)\s([^/]+)/

/**
 * Parse weekly salary and currency from an element.
 *
 * @param element - Element containing salary text
 * @returns Object with weeklySalary and currency, or null if parsing fails
 */
export const parseSalaryAndCurency = (element: Element) => {
  const value = element.textContent.trim()
  if (!value) return null

  const match = REGEX_WEEKLY_SALARY_AND_CURRENCY.exec(value)
  if (!match) return null

  return {
    weeklySalary: parseInt(match[1].replace(/\s+/g, ''), 10),
    currency: match[2],
  }
}

/**
 * Format a number by using spaces as thousand separators.
 *
 * @example
 * formatThousands(1234567) // "1 234 567"
 *
 * @param value - Number to format
 * @returns Formatted string
 */
export const formatThousands = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
