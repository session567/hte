import { describe, expect, it } from 'vitest'

import { createElement } from '@/entrypoints/content/common/test/utils'
import { calcBonuses } from '@/entrypoints/content/modules/skill-bonus/utils'

describe(calcBonuses, () => {
  it('calculates bonus for homegrown player', () => {
    const element = createElement(`
      <p>Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=20#skill" class="skill">divine</a> loyalty.</p>
      <div class="ownerAndStatusPlayerInfo"><i class="icon-mother-club"></i></div>
    `)

    expect(calcBonuses(element)).toStrictEqual({ loyalty: 1, homegrown: 0.5 })
  })

  it('calculates bonus for non-homegrown player', () => {
    const element = createElement(
      `<p>Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=18#skill" class="skill">divine</a> loyalty.</p>`,
    )

    expect(calcBonuses(element)).toStrictEqual({ loyalty: 0.9, homegrown: 0 })
  })

  it('returns 0 when no loyalty link exists', () => {
    const element = createElement('<p>Some text without loyalty information</p>')

    expect(calcBonuses(element)).toStrictEqual({ loyalty: 0, homegrown: 0 })
  })

  it('handles complex HTML with multiple skill links', () => {
    const element = createElement(`
      <p>
        A <a href="/Help/Rules/AppDenominations.aspx?lt=gentleness&ll=2#gentleness" class="skill">pleasant guy</a>
        who is <a href="/Help/Rules/AppDenominations.aspx?lt=aggressiveness&ll=2#aggressiveness" class="skill">balanced</a>
        and <a href="/Help/Rules/AppDenominations.aspx?lt=honesty&ll=2#honesty" class="skill">honest</a>.
        <br>
        Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=8#skill" class="skill">excellent</a> experience
        and <a href="/Help/Rules/AppDenominations.aspx?lt=leadership&ll=4#leadership" class="skill">weak</a> leadership.
        Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=20#skill" class="skill">divine</a> loyalty.
      </p>
      <div class="ownerAndStatusPlayerInfo">
        <i class="icon-mother-club"></i>
      </div>
    `)

    expect(calcBonuses(element)).toStrictEqual({ loyalty: 1, homegrown: 0.5 })
  })
})
