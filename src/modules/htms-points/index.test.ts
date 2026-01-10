import { isPage, pages } from '@common/utils/pages'
import htmsPoints from '@modules/htms-points'
import { calcHTMSPoints } from '@modules/htms-points/utils'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@common/utils/pages', async () => {
  const originalModule = await vi.importActual('@common/utils/pages')

  return {
    ...originalModule,
    isPage: vi.fn(),
  }
})

vi.mock('@modules/htms-points/utils', async () => {
  const originalModule = await vi.importActual('@modules/htms-points/utils')

  return {
    ...originalModule,
    calcHTMSPoints: vi.fn(),
  }
})

describe('htms-points module', () => {
  test('adds HTMS points to the player detail page', () => {
    vi.mocked(isPage).mockImplementation((page) => page === pages.playerDetailOwnTeam)
    vi.mocked(calcHTMSPoints).mockReturnValue({ ability: 1234, potential: 5678 })

    document.body.innerHTML = `
      <div id="mainBody">
        <div class="byline">
          18 years and 86 days, Next birthday: 28.01.2026
        </div>
        <div class="playerInfo">
          <div class="transferPlayerInformation">
            <table>
              <tbody>
                <tr>
                  <td class="right">TSI</td>
                  <td colspan="2">450</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="transferPlayerSkills">
            <table>
              <tbody>
                <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKeeper">
                  <td><div class="ht-bar" level="1"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trDefender">
                  <td><div class="ht-bar" level="6"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trPlaymaker">
                  <td><div class="ht-bar" level="4"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trWinger">
                  <td><div class="ht-bar" level="6"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trPasser">
                  <td><div class="ht-bar" level="4"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trScorer">
                  <td><div class="ht-bar" level="3"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKicker">
                  <td><div class="ht-bar" level="2"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `

    htmsPoints.run()

    const htmsRow = document.querySelector('.transferPlayerInformation table tbody tr:last-child')
    const labelCell = htmsRow?.querySelector('td.right')
    const valueCell = htmsRow?.querySelector<HTMLSpanElement>('span.help.hte-help')
    expect(labelCell?.textContent).toBe('htms_points_label')
    expect(valueCell?.textContent).toBe('1234 / 5678')
    expect(valueCell?.title).toBe('htms_points_help')
  })

  test('adds HTMS points to the player list page', () => {
    vi.mocked(isPage).mockImplementation((page) => page === pages.playerListOwnTeam)
    vi.mocked(calcHTMSPoints)
      .mockReturnValueOnce({ ability: 1234, potential: 5678 })
      .mockReturnValueOnce({ ability: 2345, potential: 6789 })

    document.body.innerHTML = `
      <div id="mainBody">
        <div class="playerList">
          <div class="teamphoto-player">
            <div class="playerInfo">
              <div class="transferPlayerInformation">
                <table>
                  <tbody>
                    <tr>
                      <td>Age</td>
                      <td>18 years and 86 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="transferPlayerSkills">
                <table>
                  <tbody>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKeeper">
                      <td><div class="ht-bar" level="1"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trDefender">
                      <td><div class="ht-bar" level="6"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trPlaymaker">
                      <td><div class="ht-bar" level="4"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trWinger">
                      <td><div class="ht-bar" level="6"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trPasser">
                      <td><div class="ht-bar" level="4"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trScorer">
                      <td><div class="ht-bar" level="3"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKicker">
                      <td><div class="ht-bar" level="2"></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="teamphoto-player">
            <div class="playerInfo">
              <div class="transferPlayerInformation">
                <table>
                  <tbody>
                    <tr>
                      <td>Age</td>
                      <td>21 years and 0 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="transferPlayerSkills">
                <table>
                  <tbody>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKeeper">
                      <td><div class="ht-bar" level="2"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trDefender">
                      <td><div class="ht-bar" level="7"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trPlaymaker">
                      <td><div class="ht-bar" level="5"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trWinger">
                      <td><div class="ht-bar" level="7"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trPasser">
                      <td><div class="ht-bar" level="5"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trScorer">
                      <td><div class="ht-bar" level="4"></div></td>
                    </tr>
                    <tr id="ctl00_ctl00_CPContent_CPMain_ucPlayerSkills_trKicker">
                      <td><div class="ht-bar" level="3"></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    htmsPoints.run()

    const players = document.querySelectorAll('.teamphoto-player .playerInfo')
    expect(players).toHaveLength(2)

    const htmsRow1 = players[0].querySelector('.transferPlayerInformation table tr:last-child')
    const labelCell1 = htmsRow1?.querySelector('td.right')
    const valueCell1 = htmsRow1?.querySelector<HTMLSpanElement>('span.help.hte-help')
    expect(labelCell1?.textContent).toBe('htms_points_label')
    expect(valueCell1?.textContent).toBe('1234 / 5678')
    expect(valueCell1?.title).toBe('htms_points_help')

    const htmsRow2 = players[1].querySelector('.transferPlayerInformation table tr:last-child')
    const labelCell2 = htmsRow2?.querySelector('td.right')
    const valueCell2 = htmsRow2?.querySelector<HTMLSpanElement>('span.help.hte-help')
    expect(labelCell2?.textContent).toBe('htms_points_label')
    expect(valueCell2?.textContent).toBe('2345 / 6789')
    expect(valueCell2?.title).toBe('htms_points_help')
  })

  test('adds HTMS points to the transfers search result page', () => {
    vi.mocked(isPage).mockImplementation((page) => page === pages.transfersSearchResult)
    vi.mocked(calcHTMSPoints)
      .mockReturnValueOnce({ ability: 1234, potential: 5678 })
      .mockReturnValueOnce({ ability: 2345, potential: 6789 })

    document.body.innerHTML = `
      <div id="mainBody">
        <div class="playerListDetails">
          <div class="transferPlayerInformation">
            <table>
              <tbody>
                <tr>
                  <td>Owner</td>
                  <td colspan="2">Team Name</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td colspan="2">20 years and 4 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="transferPlayerSkills">
            <table>
              <tbody>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl0_TransferPlayer_trKeeper">
                  <td><div class="ht-bar" level="1"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl0_TransferPlayer_trDefender">
                  <td><div class="ht-bar" level="7"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl0_TransferPlayer_trPlaymaker">
                  <td><div class="ht-bar" level="3"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl0_TransferPlayer_trWinger">
                  <td><div class="ht-bar" level="5"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl0_TransferPlayer_trPasser">
                  <td><div class="ht-bar" level="3"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl0_TransferPlayer_trScorer">
                  <td><div class="ht-bar" level="3"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl0_TransferPlayer_trKicker">
                  <td><div class="ht-bar" level="1"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="playerListDetails">
          <div class="transferPlayerInformation">
            <table>
              <tbody>
                <tr>
                  <td>Owner</td>
                  <td colspan="2">Another Team</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td colspan="2">20 years and 76 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="transferPlayerSkills">
            <table>
              <tbody>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl1_TransferPlayer_trKeeper">
                  <td><div class="ht-bar" level="1"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl1_TransferPlayer_trDefender">
                  <td><div class="ht-bar" level="8"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl1_TransferPlayer_trPlaymaker">
                  <td><div class="ht-bar" level="3"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl1_TransferPlayer_trWinger">
                  <td><div class="ht-bar" level="4"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl1_TransferPlayer_trPasser">
                  <td><div class="ht-bar" level="4"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl1_TransferPlayer_trScorer">
                  <td><div class="ht-bar" level="7"></div></td>
                </tr>
                <tr id="ctl00_ctl00_CPContent_CPMain_dl_ctrl1_TransferPlayer_trKicker">
                  <td><div class="ht-bar" level="4"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `

    htmsPoints.run()

    const players = document.querySelectorAll('.playerListDetails')
    expect(players).toHaveLength(2)

    const htmsRow1 = players[0].querySelector('.transferPlayerInformation table tr:last-child')
    const labelCell1 = htmsRow1?.querySelector('td.right')
    const valueCell1 = htmsRow1?.querySelector<HTMLSpanElement>('span.help.hte-help')
    expect(labelCell1?.textContent).toBe('htms_points_label')
    expect(valueCell1?.textContent).toBe('1234 / 5678')
    expect(valueCell1?.title).toBe('htms_points_help')

    const htmsRow2 = players[1].querySelector('.transferPlayerInformation table tr:last-child')
    const labelCell2 = htmsRow2?.querySelector('td.right')
    const valueCell2 = htmsRow2?.querySelector<HTMLSpanElement>('span.help.hte-help')
    expect(labelCell2?.textContent).toBe('htms_points_label')
    expect(valueCell2?.textContent).toBe('2345 / 6789')
    expect(valueCell2?.title).toBe('htms_points_help')
  })
})
