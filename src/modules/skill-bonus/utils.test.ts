import { createElement } from '@common/test/utils'
import { calcBonus } from '@modules/skill-bonus/utils'

describe('calcBonus', () => {
  it('should calculate bonus for homegrown player', () => {
    const html = `
      <p>
        Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=20#skill" class="skill">divine</a> loyalty.
      </p>
      <div class="ownerAndStatusPlayerInfo"><i class="icon-mother-club"></i></div>
    `
    const element = createElement(html)

    const bonus = calcBonus(element)

    expect(bonus).toBe(1.5)
  })

  it('should calculate bonus for non-homegrown player', () => {
    const html =
      '<p>Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=20#skill" class="skill">divine</a> loyalty.</p>'
    const element = createElement(html)

    const bonus = calcBonus(element)

    expect(bonus).toBe(1.0)
  })

  it('should return 0 when no loyalty link exists', () => {
    const element = createElement('<p>Some text without loyalty information</p>')

    const bonus = calcBonus(element)

    expect(bonus).toBe(0)
  })

  it('should handle complex HTML with multiple skill links', () => {
    const container = document.createElement('div')
    container.innerHTML = `
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
    `

    const bonus = calcBonus(container)

    expect(bonus).toBe(1.5)
  })
})
