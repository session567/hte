import { calcHTMSPoints } from '@modules/htms-points/utils'
import { describe, expect, test } from 'vitest'

describe('calcHTMSPoints', () => {
  test.each([
    { age: { years: 17, days: 3 }, levels: [1, 6, 8, 5, 5, 3, 3], expectedAbility: 502, expectedPotential: 2139 },
    { age: { years: 17, days: 3 }, levels: [1, 3, 3, 7, 3, 5, 2], expectedAbility: 301, expectedPotential: 1938 },
    { age: { years: 24, days: 27 }, levels: [2, 7, 7, 3, 5, 4, 2], expectedAbility: 498, expectedPotential: 1023 },
    { age: { years: 26, days: 51 }, levels: [1, 18, 12, 3, 7, 5, 5], expectedAbility: 1947, expectedPotential: 2158 },
    { age: { years: 29, days: 20 }, levels: [2, 2, 13, 7, 14, 18, 1], expectedAbility: 2283, expectedPotential: 2128 },
    { age: { years: 33, days: 80 }, levels: [1, 3, 13, 8, 13, 16, 9], expectedAbility: 1999, expectedPotential: 1286 },
    { age: { years: 33, days: 80 }, levels: [1, 3, 13, 8, 13, 16, 9], expectedAbility: 1999, expectedPotential: 1286 },
    { age: { years: 47, days: 103 }, levels: [0, 0, 0, 0, 0, 1, 0], expectedAbility: 4, expectedPotential: 0 },
  ])(
    'calculates ability=$expectedAbility and potential=$expectedPotential',
    ({ age, levels, expectedAbility, expectedPotential }) => {
      const skills = {
        keeper: levels[0],
        defending: levels[1],
        playmaking: levels[2],
        winger: levels[3],
        passing: levels[4],
        scoring: levels[5],
        setPieces: levels[6],
      }

      expect(calcHTMSPoints(age, skills)).toEqual({ ability: expectedAbility, potential: expectedPotential })
    },
  )
})
