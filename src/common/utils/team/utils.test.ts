import { getOwnTeamData, getPageTeamId, isOwnTeamPage } from '@common/utils/team/utils'

describe('getOwnTeamData', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should extract teamId and seriesId from series link', () => {
    document.body.innerHTML = `
      <div id="teamLinks">
        <a href="/Club/?TeamID=123">Foobar</a>
        <a href="/World/Series/?LeagueLevelUnitID=456&TeamID=123">III.3</a>
        <a href="/World/Leagues/League.aspx?LeagueID=1">Sweden</a>
      </div>
    `

    const result = getOwnTeamData()

    expect(result).toEqual({ teamId: '123', seriesId: '456' })
  })

  it('should return null values when the series link is not found', () => {
    const result = getOwnTeamData()
    expect(result).toEqual({ teamId: null, seriesId: null })
  })
})

describe('getPageTeamId', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should extract team ID from breadcrumb when present', () => {
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

    const result = getPageTeamId()

    expect(result).toBe('1234')
  })

  it('should return null when breadcrumb is missing', () => {
    const result = getPageTeamId()

    expect(result).toBeNull()
  })
})

describe('isOwnTeamPage', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should return true when both IDs match', () => {
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

    const result = isOwnTeamPage()

    expect(result).toBe(true)
  })

  it('should return false when IDs do not match', () => {
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

    const result = isOwnTeamPage()

    expect(result).toBe(false)
  })

  it('should return false when team data is missing', () => {
    const result = isOwnTeamPage()

    expect(result).toBe(false)
  })
})
