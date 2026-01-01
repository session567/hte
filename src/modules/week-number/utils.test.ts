import { calcWeekNumber, parseDate } from './utils'

describe('parseDate', () => {
  it.each([
    { desc: 'long format', input: '15.03.2024 14:30', expected: new Date(2024, 2, 15, 14, 30) },
    { desc: 'short format', input: '31.12.2023', expected: new Date(2023, 11, 31) },
  ])('should parse $desc', ({ input, expected }) => {
    const result = parseDate(input)
    expect(result).toStrictEqual(expected)
  })

  it('should return null for invalid format', () => {
    const result = parseDate('invalid-format')
    expect(result).toBeNull()
  })
})

describe('calcWeekNumber', () => {
  it.each([
    { date: new Date(2025, 11, 7, 21, 55), expectedWeek: 16 },
    { date: new Date(2025, 2, 4, 19, 45), expectedWeek: 9 },
    { date: new Date(2025, 0, 4, 13, 20), expectedWeek: 16 },
    { date: new Date(2024, 8, 17, 19, 30), expectedWeek: 1 },
    { date: new Date(2024, 2, 18, 1), expectedWeek: 7 },
  ])('should calculate week number for $date as W$expectedWeek', ({ date, expectedWeek }) => {
    const weekNumber = calcWeekNumber(date)
    expect(weekNumber).toBe(expectedWeek)
  })
})
