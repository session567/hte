import { getCurrentPathname } from '@common/utils/location'
import { isOwnTeamPage } from '@common/utils/team/utils'

export enum Scope {
  AllTeams = 'ALL_TEAMS',
  OwnTeam = 'OWN_TEAM',
}

export class Page {
  static readonly __ALL__ = '__ALL__' // All pages

  constructor(
    public readonly pathname: string,
    public readonly scope = Scope.AllTeams,
  ) {}

  toString(): string {
    return `Page(pathname=${this.pathname}, scope=${this.scope})`
  }
}

export const pages = {
  all: new Page(Page.__ALL__),
  appDenominations: new Page('/Help/Rules/AppDenominations.aspx'),
  club: new Page('/Club/'),
  matches: new Page('/Club/Matches/'),
  playerDetailAllTeams: new Page('/Club/Players/Player.aspx'),
  playerDetailOwnTeam: new Page('/Club/Players/Player.aspx', Scope.OwnTeam),
  playerListAllTeams: new Page('/Club/Players/'),
  playerListOwnTeam: new Page('/Club/Players/', Scope.OwnTeam),
  series: new Page('/World/Series/'),
  specialists: new Page('/Club/Specialists/'),
  stadium: new Page('/Club/Stadium/'),
  transfers: new Page('/World/Transfers/'),
  transfersSearchResult: new Page('/World/Transfers/TransfersSearchResult.aspx'),
  youthPlayer: new Page('/Club/Players/YouthPlayer.aspx'),
  youthPlayers: new Page('/Club/Players/YouthPlayers.aspx'),
} as const satisfies Record<string, Page>

export const isPage = (page: Page): boolean => {
  if (page.pathname !== getCurrentPathname()) return false
  if (isOwnTeamPage()) return page.scope === Scope.OwnTeam
  return page.scope === Scope.AllTeams
}

export const getCurrentPage = (): Page => {
  const page = Object.values(pages).find((page) => isPage(page))
  if (page === undefined) throw new Error('The current page is not supported.')

  return page
}
