import { beforeEach, describe, expect, it } from 'vitest'

import { formatRate, getCardRates, getPersonalityLevel } from '@/entrypoints/content/modules/player-card-rates/utils'

describe(getPersonalityLevel, () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <p>
        <a class="skill" href="/Help/Rules/AppDenominations.aspx?lt=aggressiveness&ll=3#aggressiveness">balanced</a>
        <a class="skill" href="/Help/Rules/AppDenominations.aspx?lt=honesty&ll=1#honesty">honest</a>
      </p>`
  })

  it('parses aggressiveness level', () => {
    expect(getPersonalityLevel(document.body, 'aggressiveness')).toBe(3)
  })

  it('parses honesty level', () => {
    expect(getPersonalityLevel(document.body, 'honesty')).toBe(1)
  })
})

describe(getCardRates, () => {
  it('returns rates for a known combination', () => {
    // Balanced (2) + Dishonest (1)
    expect(getCardRates(2, 1)).toStrictEqual({ yellow: 7.6, red: 0.43 })
  })

  it('returns rates for minimum levels', () => {
    // Infamous (0) + Tranquil (0)
    expect(getCardRates(0, 0)).toStrictEqual({ yellow: 2.7, red: 0.08 })
  })

  it('returns rates for maximum levels', () => {
    // Righteous (4) + Fiery (4)
    expect(getCardRates(4, 4)).toStrictEqual({ yellow: 11.4, red: 1.04 })
  })

  it('returns null for unstable aggressiveness (level 5, no data)', () => {
    expect(getCardRates(5, 2)).toBeNull()
  })

  it('returns null for saint-like honesty (level 5, no data)', () => {
    expect(getCardRates(2, 5)).toBeNull()
  })
})

describe(formatRate, () => {
  it('formats two decimal places', () => {
    expect(formatRate(0.43)).toBe('0,43%')
  })

  it('strips trailing zeros', () => {
    expect(formatRate(3.0)).toBe('3%')
  })
})
