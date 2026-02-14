import { describe, expect, it } from 'vitest'

import { getPageSeriesId } from '@/entrypoints/content/common/utils/series/utils'

describe(getPageSeriesId, () => {
  it('extracts series ID from breadcrumb when present', () => {
    document.body.innerHTML = `
      <div id="ctl00_ctl00_CPContent_divStartMain">
        <div class="boxHead">
          <h2>
           <a href="/World/Leagues/League.aspx?LeagueID=64">Slovenia</a>
           <a href="/World/Series/?LeagueLevelUnitID=1234">III.16</a>
          </h2>
        </div>
      </div>
    `

    expect(getPageSeriesId()).toBe('1234')
  })

  it('returns null when breadcrumb is missing', () => {
    expect(getPageSeriesId()).toBeNull()
  })
})
