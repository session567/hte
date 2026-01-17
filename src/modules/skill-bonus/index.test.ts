import { isPage, pages } from '@common/utils/pages'
import skillBonus from '@modules/skill-bonus'
import { describe, expect, it, vi } from 'vitest'

vi.mock(import('@common/utils/pages'), async () => {
  const originalModule = await vi.importActual('@common/utils/pages')

  return {
    ...originalModule,
    isPage: vi.fn<typeof isPage>(),
  }
})

describe('skill-bonus module', () => {
  it('adds bonus bars to skill bars on the player detail page', () => {
    vi.mocked(isPage).mockImplementation((page) => page === pages.playerDetailOwnTeam)
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="playerInfo">
          <p>
            Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=11#skill" class="skill">brilliant</a> loyalty.
          </p>
          <div class="transferPlayerSkills">
            <table>
              <tr>
                <td>Scoring</td>
                <td>
                  <div class="ht-bar" level="10">
                    <div class="bar-max">
                      <span class="bar-denomination">outstanding</span>
                    </div>
                    <div class="bar-level"></div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `

    skillBonus.run()

    const bonusBar = document.querySelector('.hte-skill-bonus-bar')

    expect(bonusBar).not.toBeNull()
    // Skill level: 10, Bonus: 0.55
    expect(bonusBar?.getAttribute('style')).toContain('width: 53%') // (10 + 0.55) / 20 * 100
    expect(bonusBar?.querySelector('.bar-denomination')).not.toBeNull()
  })

  it('adds bonus bars to multiple skill bars', () => {
    vi.mocked(isPage).mockImplementation((page) => page === pages.playerDetailOwnTeam)
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="playerInfo">
          <p>
            Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=10#skill" class="skill">outstanding</a> loyalty.
          </p>
          <div class="transferPlayerSkills">
            <table>
              <tr>
                <td>Defending</td>
                <td>
                  <div class="ht-bar" level="5">
                    <div class="bar-max">
                      <span class="bar-denomination">inadequate</span>
                    </div>
                    <div class="bar-level"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Scoring</td>
                <td>
                  <div class="ht-bar" level="13">
                    <div class="bar-max">
                      <span class="bar-denomination">world class</span>
                    </div>
                    <div class="bar-level"></div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `

    skillBonus.run()

    const bonusBars = document.querySelectorAll('.hte-skill-bonus-bar')

    expect(bonusBars).toHaveLength(2)
  })

  it("doesn't add bonus bars when bonus is 0", () => {
    vi.mocked(isPage).mockImplementation((page) => page === pages.playerDetailOwnTeam)
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="playerInfo">
          <p>
            Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=0#skill" class="skill">non-existent</a> loyalty.
          </p>
          <div class="transferPlayerSkills">
            <table>
              <tr>
                <td>Scoring</td>
                <td>
                  <div class="ht-bar" level="10">
                    <div class="bar-max">
                      <span class="bar-denomination">outstanding</span>
                    </div>
                    <div class="bar-level"></div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `

    skillBonus.run()

    const bonusBar = document.querySelector('.hte-skill-bonus-bar')

    expect(bonusBar).toBeNull()
  })

  it("doesn't add bonus bar when skill has no bar-level (non-existent skill)", () => {
    vi.mocked(isPage).mockImplementation((page) => page === pages.playerDetailOwnTeam)
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="playerInfo">
          <p>
            Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=10#skill" class="skill">outstanding</a> loyalty.
          </p>
          <div class="transferPlayerSkills">
            <table>
              <tr>
                <td class="right">Scoring</td>
                <td colspan="2">
                  <div class="ht-bar" level="0" max="20">
                    <div class="bar-max">
                      <span class="bar-denomination">non-existent</span>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `

    skillBonus.run()

    const bonusBar = document.querySelector('.hte-skill-bonus-bar')

    expect(bonusBar).toBeNull()
  })

  it('adds bonus bars to multiple players on the player list', () => {
    vi.mocked(isPage).mockImplementation((page) => page === pages.playerListOwnTeam)
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="playerList">
          <div class="teamphoto-player">
            <p>Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=20#skill" class="skill">divine</a> loyalty.</p>
            <div class="transferPlayerSkills">
              <table>
                <tr>
                  <td>Scoring</td>
                  <td>
                    <div class="ht-bar" level="7">
                      <div class="bar-max">
                        <span class="bar-denomination">solid</span>
                      </div>
                      <div class="bar-level"></div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="teamphoto-player">
            <p>Has <a href="/Help/Rules/AppDenominations.aspx?lt=skill&ll=18#skill" class="skill">magical</a> loyalty.</p>
            <i class="icon-mother-club"></i>
            <div class="transferPlayerSkills">
              <table>
                <tr>
                  <td>Playmaking</td>
                  <td>
                    <div class="ht-bar" level="16">
                      <div class="bar-max">
                        <span class="bar-denomination">extra-terrestrial</span>
                      </div>
                      <div class="bar-level"></div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    `

    skillBonus.run()

    const bonusBars = document.querySelectorAll('.hte-skill-bonus-bar')

    expect(bonusBars).toHaveLength(2)

    // Skill level: 7, Bonus: 1.0
    expect(bonusBars[0].getAttribute('style')).toContain('width: 40%') // (7 + 1.0) / 20 * 100
    expect(bonusBars[0].querySelector('.bar-denomination')).not.toBeNull()

    // Skill level: 16, Bonus: 1.4
    expect(bonusBars[1].getAttribute('style')).toContain('width: 87') // (16 + 1.4) / 20 * 100
    expect(bonusBars[1].querySelector('.bar-denomination')).not.toBeNull()
  })
})
