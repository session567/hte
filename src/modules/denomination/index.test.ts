import denomination from '@modules/denomination'

describe('denomination module', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should add denomination number after link', () => {
    document.body.innerHTML =
      '<a href="/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=6#skill" class="skill">passable</a>'

    denomination.run()

    const span = document.querySelector<HTMLSpanElement>('span.shy.denominationNumber')
    expect(span?.textContent).toBe('(6)')
  })

  it('should not add denomination number after link if it already exists', () => {
    document.body.innerHTML = `
      <a href="/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=6#skill" class="skill">passable</a>
      <span class="shy denominationNumber">(6)</span>
    `

    const spansBefore = document.querySelectorAll<HTMLSpanElement>('span.shy.denominationNumber')
    expect(spansBefore).toHaveLength(1)

    denomination.run()

    const spansAfter = document.querySelectorAll<HTMLSpanElement>('span.shy.denominationNumber')
    expect(spansAfter).toHaveLength(1)
  })

  it('should add personality number after link for personality types', () => {
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
    expect(gentlenessSpan?.textContent).toBe('2')

    expect(aggressivenessSpan?.className).toBe('hte-skill hte-aggressiveness-4')
    expect(aggressivenessSpan?.textContent).toBe('4')

    expect(honestySpan?.className).toBe('hte-skill hte-honesty-1')
    expect(honestySpan?.textContent).toBe('1')
  })
})
