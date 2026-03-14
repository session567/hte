import { describe, expect, it } from 'vitest'

import { getOwnTeamData, getPageTeamId, isLoggedIn, isOwnTeamPage } from '@/entrypoints/content/common/utils/team/utils'

describe(getOwnTeamData, () => {
  it('extracts team data from links', () => {
    document.body.innerHTML = `
      <div id="teamLinks">
        <a href="/World/Series/?LeagueLevelUnitID=456&TeamID=123">III.3</a>
      </div>
      <div id="ctl00_ctl00_CPHeader_ucNewMenu_repMenu_ctl00_pnlSubMenu">
        <ul>
          <li><a href="/Club/Youth/?YouthTeamID=789">Overview</a></li>
        </ul>
      </div>
    `

    expect(getOwnTeamData()).toStrictEqual({ teamId: '123', seriesId: '456', youthTeamId: '789' })
  })
})

describe(getPageTeamId, () => {
  it('extracts team ID from breadcrumb when present', () => {
    document.body.innerHTML = `
      <div id="ctl00_ctl00_CPContent_divStartMain">
        <div class="boxHead">
          <h2>
            <a href="/Club/?TeamID=1234">Foobar</a> »
            <a href="/Club/Players/?TeamID=1234">Players</a> »
          </h2>
        </div>
      </div>
    `

    expect(getPageTeamId()).toBe('1234')
  })

  it('extracts youth team ID from breadcrumb when present', () => {
    document.body.innerHTML = `
      <div id="ctl00_ctl00_CPContent_divStartMain">
        <div class="boxHead">
          <h2>
            <a href="/Club/Youth/?YouthTeamID=5678">Youth Team</a> »
          </h2>
        </div>
      </div>
    `

    expect(getPageTeamId()).toBe('5678')
  })

  it('returns null when breadcrumb is missing', () => {
    expect(getPageTeamId()).toBeNull()
  })
})

describe(isOwnTeamPage, () => {
  it('returns true when page is senior team and both IDs match', () => {
    document.body.innerHTML = `
      <div id="teamLinks">
        <a href="/World/Series/?LeagueLevelUnitID=456&TeamID=123">III.3</a>
      </div>
      
      <div id="ctl00_ctl00_CPContent_divStartMain">
        <div class="boxHead">
          <h2>
            <a href="/Club/?TeamID=123">My Team</a> »
          </h2>
        </div>
      </div>
    `

    expect(isOwnTeamPage()).toBe(true)
  })

  it('returns true when page is youth team and both IDs match', () => {
    document.body.innerHTML = `
      <div id="teamLinks">
        <a href="/World/Series/?LeagueLevelUnitID=456&TeamID=123">III.3</a>
      </div>
      <div id="ctl00_ctl00_CPHeader_ucNewMenu_repMenu_ctl00_pnlSubMenu">
        <ul>
          <li><a href="/Club/Youth/?YouthTeamID=789">Overview</a></li>
        </ul>
      </div>
      
      <div id="ctl00_ctl00_CPContent_divStartMain">
        <div class="boxHead">
          <h2>
            <a href="/Club/Youth/?YouthTeamID=789">My Youth Team</a> »
          </h2>
        </div>
      </div>
    `

    expect(isOwnTeamPage()).toBe(true)
  })

  it('returns false when IDs do not match', () => {
    document.body.innerHTML = `
      <div id="teamLinks">
        <a href="/World/Series/?LeagueLevelUnitID=456&TeamID=123">III.3</a>
      </div>
      
      <div id="ctl00_ctl00_CPContent_divStartMain">
        <div class="boxHead">
          <h2>
            <a href="/Club/?TeamID=999">Other Team</a> »
          </h2>
        </div>
      </div>
    `

    expect(isOwnTeamPage()).toBe(false)
  })

  it('returns false when team data is missing', () => {
    expect(isOwnTeamPage()).toBe(false)
  })
})

describe(isLoggedIn, () => {
  it('returns true when user is logged in', () => {
    document.body.innerHTML = `
      <div id="teamLinks">
        <a href="/World/Series/?LeagueLevelUnitID=456&TeamID=123">III.3</a>
      </div>
    `

    expect(isLoggedIn()).toBe(true)
  })

  it('returns false when user is not logged in', () => {
    expect(isLoggedIn()).toBe(false)
  })
})
