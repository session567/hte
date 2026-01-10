import { createElement } from '@common/test/utils'
import { formatThousands, parseSalaryAndCurency } from '@modules/salary/utils'
import { describe, expect, test } from 'vitest'

describe('parseSalaryAndCurency', () => {
  test.each([
    { text: '54 300 €/week', expected: { weeklySalary: 54_300, currency: '€' } },
    { text: '217 200 zł/week', expected: { weeklySalary: 217_200, currency: 'zł' } },
    { text: '2 715 000 taka/week', expected: { weeklySalary: 2_715_000, currency: 'taka' } },
  ])('parses weekly salary and currency for $text', ({ text, expected }) => {
    const element = createElement(text)

    expect(parseSalaryAndCurency(element)).toEqual(expected)
  })
})

describe('numberWithSpaces', () => {
  test.each([
    { value: 123, expected: '123' },
    { value: 1234, expected: '1 234' },
    { value: 12345, expected: '12 345' },
    { value: 123456, expected: '123 456' },
    { value: 1234567, expected: '1 234 567' },
    { value: 12345678, expected: '12 345 678' },
    { value: 123456789, expected: '123 456 789' },
  ])('converts $value to $expected', ({ value, expected }) => {
    expect(formatThousands(value)).toEqual(expected)
  })
})
