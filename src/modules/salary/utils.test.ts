import { createNode } from '@common/test/utils'
import { numberWithSpaces, parseSalaryAndCurency } from '@modules/salary/utils'

describe('parseWeeklySalaryAndCurrency', () => {
  it.each([
    { text: '54 300 €/week', expected: { weeklySalary: 54_300, currency: '€' } },
    { text: '217 200 zł/week', expected: { weeklySalary: 217_200, currency: 'zł' } },
    { text: '2 715 000 taka/week', expected: { weeklySalary: 2_715_000, currency: 'taka' } },
  ])('should parse weekly salary and currency for $text', ({ text, expected }) => {
    const node = createNode(text)

    const result = parseSalaryAndCurency(node)

    expect(result).toEqual(expected)
  })
})

describe('numberWithSpaces', () => {
  it.each([
    { value: 123, expected: '123' },
    { value: 1234, expected: '1 234' },
    { value: 12345, expected: '12 345' },
    { value: 123456, expected: '123 456' },
    { value: 1234567, expected: '1 234 567' },
    { value: 12345678, expected: '12 345 678' },
    { value: 123456789, expected: '123 456 789' },
  ])('should convert $value to $expected', ({ value, expected }) => {
    const result = numberWithSpaces(value)

    expect(result).toEqual(expected)
  })
})
