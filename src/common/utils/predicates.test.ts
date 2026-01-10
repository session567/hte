import { isNil } from '@common/utils/predicates'
import { describe, expect, test } from 'vitest'

describe('isNil', () => {
  test('returns true if the value is null or undefined', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  test('returns false if the value is not null nor undefined', () => {
    expect(isNil('')).toBe(false)
    expect(isNil(1)).toBe(false)
  })
})
