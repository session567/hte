import denomination from '@modules/denomination'
import { describe, expect, it } from 'vitest'

describe('denomination module', () => {
  it('adds denomination number with max value after link', () => {
    document.body.innerHTML = `<a href="/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=6#skill" class="skill">passable</a>`

    denomination.run()

    const span = document.querySelector<HTMLSpanElement>('span.shy.denominationNumber')

    expect(span?.textContent).toBe('(6/20)')
  })

  it('replaces existing denomination number with updated format', () => {
    document.body.innerHTML = `
      <a href="/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=6#skill" class="skill">passable</a>
      <span class="shy denominationNumber">(6)</span>
    `

    denomination.run()

    const spans = document.querySelectorAll<HTMLSpanElement>('span.shy.denominationNumber')

    expect(spans).toHaveLength(1)
    expect(spans[0].textContent).toBe('(6/20)')
  })

  it('adds personality number with max value after link for personality types', () => {
    document.body.innerHTML = `
      A <a href="/Help/Rules/AppDenominations.aspx?lt=gentleness&amp;ll=2#gentleness" class="skill">pleasant guy</a>
      who is <a href="/Help/Rules/AppDenominations.aspx?lt=aggressiveness&amp;ll=4#aggressiveness" class="skill">balanced</a>
      and <a href="/Help/Rules/AppDenominations.aspx?lt=honesty&amp;ll=1#honesty" class="skill">honest</a>.
    `

    denomination.run()

    const links = document.querySelectorAll<HTMLAnchorElement>('a.skill')

    expect(links).toHaveLength(3)

    const gentlenessSpan = links[0].nextElementSibling
    const aggressivenessSpan = links[1].nextElementSibling
    const honestySpan = links[2].nextElementSibling

    expect(gentlenessSpan?.className).toBe('hte-skill hte-gentleness-2')
    expect(gentlenessSpan?.textContent).toBe('2/6')

    expect(aggressivenessSpan?.className).toBe('hte-skill hte-aggressiveness-4')
    expect(aggressivenessSpan?.textContent).toBe('4/6')

    expect(honestySpan?.className).toBe('hte-skill hte-honesty-1')
    expect(honestySpan?.textContent).toBe('1/6')
  })

  it('skips unsupported denomination type', () => {
    document.body.innerHTML = `<a href="/Help/Rules/AppDenominations.aspx?lt=unknown&amp;ll=5#unknown" class="skill">unknown</a>`

    denomination.run()

    const span = document.querySelector<HTMLSpanElement>('span.shy.denominationNumber')

    expect(span).toBeNull()
  })
})
