import { isNil } from '@common/utils/predicates'
import { describe, expect, it } from 'vitest'

describe(isNil, () => {
  it('returns true if the value is null or undefined', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  it('returns false if the value is not null nor undefined', () => {
    expect(isNil('')).toBe(false)
    expect(isNil(1)).toBe(false)
  })
})
