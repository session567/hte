import { getOwnTeamData, getPageTeamId, isOwnTeamPage } from '@common/utils/team/utils'
import { describe, expect, test } from 'vitest'

describe('getOwnTeamData', () => {
  test('extracts teamId and seriesId from series link', () => {
    document.body.innerHTML = `
      <div id="teamLinks">
        <a href="/Club/?TeamID=123">Foobar</a>
        <a href="/World/Series/?LeagueLevelUnitID=456&TeamID=123">III.3</a>
        <a href="/World/Leagues/League.aspx?LeagueID=1">Sweden</a>
      </div>
    `

    expect(getOwnTeamData()).toEqual({ teamId: '123', seriesId: '456' })
  })

  test('returns null values when the series link is not found', () => {
    expect(getOwnTeamData()).toEqual({ teamId: null, seriesId: null })
  })
})

describe('getPageTeamId', () => {
  test('extracts team ID from breadcrumb when present', () => {
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

  test('returns null when breadcrumb is missing', () => {
    expect(getPageTeamId()).toBeNull()
  })
})

describe('isOwnTeamPage', () => {
  test('returns true when both IDs match', () => {
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

  test('returns false when IDs do not match', () => {
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

  test('returns false when team data is missing', () => {
    expect(isOwnTeamPage()).toBe(false)
  })
})
