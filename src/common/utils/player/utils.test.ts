import { createElement } from '@common/test/utils'
import { logger } from '@common/utils/logger'
import { PlayerSkills } from '@common/utils/player/constants'
import { parsePlayerAge, parsePlayerSkills } from '@common/utils/player/utils'
import { describe, expect, test } from 'vitest'

describe('parsePlayerAge', () => {
  test.each([
    { html: '26 years and 86 days', expected: { years: 26, days: 86 } },
    { html: '21 years and 0 days', expected: { years: 21, days: 0 } },
    { html: '26 years and 86 days, Next birthday: 28.01.2026', expected: { years: 26, days: 86 } },
    { html: '29 years and 20 days, Next birthday: 01.01.2026', expected: { years: 29, days: 20 } },
  ])('parses age from text: $html', ({ html, expected }) => {
    const element = createElement(html)

    expect(parsePlayerAge(element)).toEqual(expected)
  })

  test.each([
    { desc: 'empty text', html: '' },
    { desc: 'invalid format', html: 'invalid age format' },
    { desc: 'partial match', html: '26 years' },
    { desc: 'extra text', html: 'extra text 26 years and 10 days' },
  ])('returns null for $desc', ({ html }) => {
    const element = createElement(html)

    expect(parsePlayerAge(element)).toBeNull()
  })
})

describe('parsePlayerSkills', () => {
  test('parses all skills from player detail page', () => {
    const element = createElement(`
      <div class="transferPlayerSkills">
        <table>
          <tbody>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKeeper">
              <td><div class="ht-bar" level="1"></div></td>
            </tr>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trDefender">
              <td><div class="ht-bar" level="6"></div></td>
            </tr>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trPlaymaker">
              <td><div class="ht-bar" level="4"></div></td>
            </tr>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trWinger">
              <td><div class="ht-bar" level="6"></div></td>
            </tr>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trPasser">
              <td><div class="ht-bar" level="4"></div></td>
            </tr>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trScorer">
              <td><div class="ht-bar" level="3"></div></td>
            </tr>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKicker">
              <td><div class="ht-bar" level="2"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    `)

    const expected: PlayerSkills = {
      keeper: 1,
      defending: 6,
      playmaking: 4,
      winger: 6,
      passing: 4,
      scoring: 3,
      setPieces: 2,
    }
    expect(parsePlayerSkills(element)).toEqual(expected)
  })

  test('returns null and logs warning when only one skill is found', () => {
    const element = createElement(`
      <div class="transferPlayerSkills">
        <table>
          <tbody>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKeeper">
              <td><div class="ht-bar" level="1"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    `)

    expect(parsePlayerSkills(element)).toBeNull()
    expect(logger.warn).toHaveBeenCalledWith('Cannot parse skills. Expected 7 skills, found 1.', { keeper: 1 })
  })

  test('returns null for empty HTML', () => {
    const element = createElement('')

    expect(parsePlayerSkills(element)).toBeNull()
  })
})
