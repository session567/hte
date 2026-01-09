const REGEX_WEEKLY_SALARY_AND_CURRENCY = /^([\d\s]+)\s([^/]+)/

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

export const numberWithSpaces = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
