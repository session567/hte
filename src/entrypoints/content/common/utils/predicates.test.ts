import { describe, expect, it } from 'vitest'

import { isNil } from '@/entrypoints/content/common/utils/predicates'

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
