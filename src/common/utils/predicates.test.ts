import { isNil } from '@common/utils/predicates'

describe('isNil', () => {
  it('should return true if the value is null or undefined', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  it('should return false if the value is not null nor undefined', () => {
    expect(isNil('')).toBe(false)
    expect(isNil(1)).toBe(false)
  })
})
