import { describe, expect, it, vi } from 'vitest'

import type { getSetting } from '@/common/utils/settings'
import denomination from '@/entrypoints/content/modules/denomination/index'

vi.mock(import('@/common/utils/settings'), async (importOriginal) => {
  return {
    ...(await importOriginal()),
    getSetting: vi.fn<typeof getSetting>().mockResolvedValue(true),
  }
})

describe('denomination module', () => {
  it('adds denomination number with max value after link', async () => {
    document.body.innerHTML = `<a href="/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=6#skill" class="skill">passable</a>`

    await denomination.run()

    const span = document.querySelector<HTMLSpanElement>('span.shy.denominationNumber')

    expect(span?.textContent).toBe('(6/20)')
  })

  it('replaces existing denomination number with updated format', async () => {
    document.body.innerHTML = `
      <a href="/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=6#skill" class="skill">passable</a>
      <span class="shy denominationNumber">(6)</span>
    `

    await denomination.run()

    const spans = document.querySelectorAll<HTMLSpanElement>('span.shy.denominationNumber')

    expect(spans).toHaveLength(1)
    expect(spans[0].textContent).toBe('(6/20)')
  })

  it('adds personality number with max value after link for personality types', async () => {
    document.body.innerHTML = `
      A <a href="/Help/Rules/AppDenominations.aspx?lt=gentleness&amp;ll=2#gentleness" class="skill">pleasant guy</a>
      who is <a href="/Help/Rules/AppDenominations.aspx?lt=aggressiveness&amp;ll=4#aggressiveness" class="skill">balanced</a>
      and <a href="/Help/Rules/AppDenominations.aspx?lt=honesty&amp;ll=1#honesty" class="skill">honest</a>.
    `

    await denomination.run()

    const links = document.querySelectorAll<HTMLAnchorElement>('a.skill')

    expect(links).toHaveLength(3)

    const gentlenessSpan = links[0].nextElementSibling
    const aggressivenessSpan = links[1].nextElementSibling
    const honestySpan = links[2].nextElementSibling

    expect(gentlenessSpan?.className).toBe('hte-skill hte-gentleness-2')
    expect(gentlenessSpan?.textContent).toBe('2/5')

    expect(aggressivenessSpan?.className).toBe('hte-skill hte-aggressiveness-4')
    expect(aggressivenessSpan?.textContent).toBe('1/5')

    expect(honestySpan?.className).toBe('hte-skill hte-honesty-1')
    expect(honestySpan?.textContent).toBe('1/5')
  })

  it('skips unsupported denomination type', async () => {
    document.body.innerHTML = `<a href="/Help/Rules/AppDenominations.aspx?lt=unknown&amp;ll=5#unknown" class="skill">unknown</a>`

    await denomination.run()

    const span = document.querySelector<HTMLSpanElement>('span.shy.denominationNumber')

    expect(span).toBeNull()
  })
})
