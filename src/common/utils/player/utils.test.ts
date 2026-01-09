import { createElement } from '@common/test/utils'
import { logger } from '@common/utils/logger'
import { parsePlayerAge, parsePlayerSkills } from '@common/utils/player/utils'

describe('parsePlayerAge', () => {
  it.each([
    { html: '26 years and 86 days', expected: { years: 26, days: 86 } },
    { html: '21 years and 0 days', expected: { years: 21, days: 0 } },
    { html: '26 years and 86 days, Next birthday: 28.01.2026', expected: { years: 26, days: 86 } },
    { html: '29 years and 20 days, Next birthday: 01.01.2026', expected: { years: 29, days: 20 } },
  ])('should parse age from text: $html', ({ html, expected }) => {
    const element = createElement(html)

    const result = parsePlayerAge(element)

    expect(result).toEqual(expected)
  })

  it('should parse age from table cell with additional text', () => {
    const html = `
      <table>
        <tr>
          <td class="right">Age</td>
          <td colspan="2" class="nowrap">26 years and 86 days</td>
        </tr>
      </table>
    `
    const element = createElement(html)

    const result = parsePlayerAge(element)

    expect(result).toEqual({ years: 26, days: 86 })
  })

  it.each([
    { desc: 'empty text', html: '' },
    { desc: 'invalid format', html: 'invalid age format' },
    { desc: 'partial match', html: '26 years' },
  ])('should return null for $desc', ({ html }) => {
    const element = createElement(html)

    const result = parsePlayerAge(element)

    expect(result).toBeNull()
  })
})

describe('parsePlayerSkills', () => {
  it('should parse all skills from player detail page', () => {
    const html = `
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
    `
    const element = createElement(html)

    const result = parsePlayerSkills(element)

    expect(result).not.toBeNull()
    expect(result?.keeper).toBe(1)
    expect(result?.defending).toBe(6)
    expect(result?.playmaking).toBe(4)
    expect(result?.winger).toBe(6)
    expect(result?.passing).toBe(4)
    expect(result?.scoring).toBe(3)
    expect(result?.setPieces).toBe(2)
  })

  it('should return null and log warning when only one skill is found', () => {
    const html = `
      <div class="transferPlayerSkills">
        <table>
          <tbody>
            <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKeeper">
              <td><div class="ht-bar" level="1"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
    const element = createElement(html)

    const result = parsePlayerSkills(element)

    expect(result).toBeNull()
    expect(logger.warn).toHaveBeenCalledWith('Cannot parse skills. Expected 7 skill, found 1.', { keeper: 1 })
  })

  it('should return null for empty HTML', () => {
    const html = ''
    const element = createElement(html)

    const result = parsePlayerSkills(element)

    expect(result).toBeNull()
  })
})
