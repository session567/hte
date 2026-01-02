import { createNode } from '@common/test/utils'
import { logger } from '@common/utils/logger'
import { Skill } from '@common/utils/player/constants'
import { parsePlayerAge, parsePlayerSkills } from '@common/utils/player/utils'

describe('parsePlayerAge', () => {
  it.each([
    { html: '26 years and 86 days', expected: { years: 26, days: 86 } },
    { html: '21 years and 0 days', expected: { years: 21, days: 0 } },
    { html: '26 years and 86 days, Next birthday: 28.01.2026', expected: { years: 26, days: 86 } },
    { html: '29 years and 20 days, Next birthday: 01.01.2026', expected: { years: 29, days: 20 } },
  ])('should parse age from text: $html', ({ html, expected }) => {
    const node = createNode(html)

    const result = parsePlayerAge(node)

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
    const node = createNode(html)

    const result = parsePlayerAge(node)

    expect(result).toEqual({ years: 26, days: 86 })
  })

  it.each([
    { desc: 'empty text', html: '' },
    { desc: 'invalid format', html: 'invalid age format' },
    { desc: 'partial match', html: '26 years' },
  ])('should return null for $desc', ({ html }) => {
    const node = createNode(html)

    const result = parsePlayerAge(node)

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
    const node = createNode(html)

    const result = parsePlayerSkills(node)

    expect(result).not.toBeNull()
    expect(result?.[Skill.Keeper]).toBe(1)
    expect(result?.[Skill.Defending]).toBe(6)
    expect(result?.[Skill.Playmaking]).toBe(4)
    expect(result?.[Skill.Winger]).toBe(6)
    expect(result?.[Skill.Passing]).toBe(4)
    expect(result?.[Skill.Scoring]).toBe(3)
    expect(result?.[Skill.SetPieces]).toBe(2)
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
    const node = createNode(html)

    const result = parsePlayerSkills(node)

    expect(result).toBeNull()
    expect(logger.warn).toHaveBeenCalledWith('Cannot parse skills. Expected 7 skill, found 1.', { [Skill.Keeper]: 1 })
  })

  it('should return null for empty HTML', () => {
    const html = ''
    const node = createNode(html)

    const result = parsePlayerSkills(node)

    expect(result).toBeNull()
  })
})
