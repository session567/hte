import { describe, expect, it, vi } from 'vitest'

import { mockIsPage } from '@/entrypoints/content/common/test/utils'
import { isCurrentPage, pages } from '@/entrypoints/content/common/utils/pages'
import hatstats from '@/entrypoints/content/modules/hatstats/index'

vi.mock(import('@/entrypoints/content/common/utils/pages'), async (importOriginal) => {
  return {
    ...(await importOriginal()),
    isCurrentPage: vi.fn<typeof isCurrentPage>(),
  }
})

const makeMatchDetailHTML = (homeRatings: number[], awayRatings: number[]): string => {
  const makeRow = (home: number, away: number) => `
    <tr>
      <td></td>
      <td></td>
      <td>
        <ht-match-rating>
          <ht-bar level="${home}"></ht-bar>
        </ht-match-rating>
        </td>
      <td></td>
      <td></td>
      <td>
        <ht-match-rating>
          <ht-bar level="${away}"></ht-bar>
        </ht-match-rating>
      </td>
    </tr>`

  return `
    <ht-match>
      <div class="box postmatch-ratings">
        <table>
          <tbody>
            ${homeRatings.map((home, i) => makeRow(home, awayRatings[i])).join('')}
          </tbody>
        </table>
      </div>
    </ht-match>
  `
}

const expectHatStats = (el: Element | null, values: [number, number, number, number]) => {
  for (const value of values) {
    expect(el?.textContent).toContain(value.toString())
  }
}

const makeMatchOrderHTML = (ratings: number[]): string => `
  <div class="ht-tabs-wizard">
    <li></li>
    <li class="ht-tabs-item-selected"></li>
  </div>
  <ng-app app="matchorder">
    <div class="mo-field-view-lineup">
      <div class="mo-field-rating-predicitons-holder">
        <div class="mo-field-rating-predicitons">
          ${ratings.map((r) => `<div><span>${r}</span></div>`).join('')}
        </div>
      </div>
    </div>
  </ng-app>
`

describe('hatstats module on matchOrder page', () => {
  it('renders HatStats', async () => {
    mockIsPage(pages.matchOrder)
    // Order: right defence, central defence, left defence, midfield, right attack, central attack, left attack
    document.body.innerHTML = makeMatchOrderHTML([13.5, 12.75, 13.25, 11.75, 13.25, 15.25, 12.5])

    await hatstats.run()

    expectHatStats(document.querySelector('.hte-hatstats-mo'), [132, 149, 155, 436])
  })

  it('re-renders when rating predictions change', async () => {
    mockIsPage(pages.matchOrder)
    // Order: right defence, central defence, left defence, midfield, right attack, central attack, left attack
    document.body.innerHTML = makeMatchOrderHTML([13.5, 12.75, 13.25, 11.75, 13.25, 15.25, 12.5])

    await hatstats.run()

    expectHatStats(document.querySelector('.hte-hatstats-mo'), [132, 149, 155, 436])

    // Change right defence: 13.5 -> 10.25, lowering defence by 13 and total by 13
    const span = document.querySelectorAll('.mo-field-rating-predicitons span')[0]
    span.firstChild!.textContent = '10.25'

    await vi.waitFor(() => {
      expectHatStats(document.querySelector('.hte-hatstats-mo'), [132, 136, 155, 423])
    })
  })

  it('does not render when .mo-field-view-lineup is absent', async () => {
    mockIsPage(pages.matchOrder)
    document.body.innerHTML = `
      <div class="ht-tabs-wizard">
        <li></li>
        <li class="ht-tabs-item-selected"></li>
      </div>
      <ng-app app="matchorder"></ng-app>
    `

    await hatstats.run()

    expect(document.querySelector('.hte-hatstats-mo')).toBeNull()
  })
})

describe('hatstats module on matchDetail page', () => {
  // Order: midfield, right defence, central defence, left defence, right attack, central attack, left attack
  const homeRatings = [11.75, 13.5, 12.75, 13.25, 13.25, 15.25, 12.5]
  const awayRatings = [10, 12, 11, 12, 12, 13, 11]

  it('renders HatStats table with correct values for home and away', async () => {
    mockIsPage(pages.matchDetail.senior)
    document.body.innerHTML = makeMatchDetailHTML(homeRatings, awayRatings)

    await hatstats.run()

    expectHatStats(document.querySelector('.hte-hatstats'), [132, 149, 155, 436])
  })

  it('does not render for a pre-match', async () => {
    mockIsPage(pages.matchDetail.senior)
    document.body.innerHTML = `<ht-match><div class="match-h2h"></div></ht-match>`

    await hatstats.run()

    expect(document.querySelector('.hte-hatstats')).toBeNull()
  })

  it('does not render for a live match', async () => {
    mockIsPage(pages.matchDetail.senior)
    document.body.innerHTML = `<ht-match><div class="live-matchstatus"></div></ht-match>`

    await hatstats.run()

    expect(document.querySelector('.hte-hatstats')).toBeNull()
  })

  it('does not render for a walkover', async () => {
    mockIsPage(pages.matchDetail.senior)
    document.body.innerHTML = `<ht-match><span class="live-matchtime"><!----></span></ht-match>`

    await hatstats.run()

    expect(document.querySelector('.hte-hatstats')).toBeNull()
  })
})
