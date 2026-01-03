const WEEKLY_SALARY_AND_CURRENCY_REGEX = /^([\d\s]+)\s([^/]+)/

export const parseSalaryAndCurency = (node: ParentNode) => {
  const value = node.textContent?.trim()
  if (!value) return null

  const match = value.match(WEEKLY_SALARY_AND_CURRENCY_REGEX)
  if (!match) return null

  return {
    weeklySalary: parseInt(match[1].replace(/\s+/g, ''), 10),
    currency: match[2],
  }
}

export const numberWithSpaces = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
