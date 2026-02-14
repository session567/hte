import { describe, expect, it, vi } from 'vitest'

import { isPage, pages } from '@/entrypoints/content/common/utils/pages'
import weekNumber from '@/entrypoints/content/modules/week-number/index'

vi.mock(import('@/entrypoints/content/common/utils/pages'), async () => {
  const originalModule = await vi.importActual('@/entrypoints/content/common/utils/pages')

  return {
    ...originalModule,
    isPage: vi.fn<typeof isPage>(),
  }
})

describe('week-number module', () => {
  it.each([
    { dateString: '16.12.2025 19:30', expected: ' (W2)' },
    { dateString: '23.12.2025', expected: ' (W3)' },
  ])('adds week number after date: $dateString', ({ dateString, expected }) => {
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="date">${dateString}</div>
      </div>
    `

    weekNumber.run()

    const span = document.querySelector<HTMLSpanElement>('.date > span.hte-week-number')

    expect(span?.textContent).toBe(expected)
  })

  it.each([
    { desc: 'own team', page: pages.playerDetailOwnTeam },
    { desc: 'other team', page: pages.playerDetailOtherTeam },
  ])('observes player tabs and adds week numbers on content change', async ({ page }) => {
    vi.mocked(isPage).mockImplementation((p) => p === page)

    document.body.innerHTML = `
        <div id="mainBody">
          <div id="ctl00_ctl00_CPContent_CPMain_updPlayerTabs"></div>
        </div>
      `
    weekNumber.run()

    // Simulate content update
    const playerTabs = document.getElementById('ctl00_ctl00_CPContent_CPMain_updPlayerTabs')!
    playerTabs.innerHTML = '<div class="date">15.05.2025</div>'

    await vi.waitFor(() => {
      const newWeekNumber = playerTabs.querySelector<HTMLSpanElement>('span.hte-week-number')

      expect(newWeekNumber?.textContent).toBe(' (W3)')
    })
  })

  it("doesn't add week number for invalid date", () => {
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="date">invalid date</div>
      </div>
    `
    const originalHTML = document.body.innerHTML

    weekNumber.run()

    expect(document.body.innerHTML).toBe(originalHTML)
  })
})
