import { createElement } from '@common/test/utils'
import { calcWeekNumber, parseDate } from '@modules/week-number/utils'

describe('parseDate', () => {
  it.each([
    { html: '15.03.2024 14:30', expected: new Date(2024, 2, 15, 14, 30) },
    { html: '31.12.2023', expected: new Date(2023, 11, 31) },
  ])('should parse date from text: $html', ({ html, expected }) => {
    const element = createElement(html)

    const result = parseDate(element)

    expect(result).toStrictEqual(expected)
  })

  it.each([
    { desc: 'empty text', html: '' },
    { desc: 'invalid format', html: 'invalid-format' },
  ])('should return null for $desc', ({ html }) => {
    const element = createElement(html)

    const result = parseDate(element)

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
