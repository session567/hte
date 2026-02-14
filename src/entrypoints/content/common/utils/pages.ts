import { getCurrentPathname } from '@/entrypoints/content/common/utils/location'
import { isOwnTeamPage } from '@/entrypoints/content/common/utils/team/utils'

type TeamContext = 'OWN_TEAM' | 'OTHER_TEAM'

/**
 * Represents a specific page on Hattrick.
 *
 * Used to determine which modules should run on the current page.
 */
export class Page {
  /**
   * Special pathname value indicating a module should run on all pages.
   */
  static readonly __ALL__ = '__ALL__'

  /**
   * @param pathname - The URL pathname of the Hattrick page (e.g., '/Club/Players/')
   * @param teamContext - If this page exists for both my team and other teams, specify which one it refers to
   */
  constructor(
    public readonly pathname: string,
    public readonly teamContext?: TeamContext,
  ) {}

  toString(): string {
    return `Page(pathname=${this.pathname}, teamContext=${this.teamContext})`
  }
}

/**
 * Dictionary of all supported Hattrick pages.
 *
 * Modules reference these pages to determine where they should run.
 */
export const pages = {
  // Special case
  all: new Page(Page.__ALL__),

  // Pages not related to the user's team
  appDenominations: new Page('/Help/Rules/AppDenominations.aspx'),
  forum: new Page('/Forum/'),
  series: new Page('/World/Series/'),
  transfers: new Page('/World/Transfers/'),
  transfersSearchResult: new Page('/World/Transfers/TransfersSearchResult.aspx'),

  // Pages accessible only to the user's own team
  club: new Page('/Club/'),
  matches: new Page('/Club/Matches/'),
  specialists: new Page('/Club/Specialists/'),
  stadium: new Page('/Club/Stadium/'),

  // Pages accessible to both the user's own team and other teams
  playerDetailOtherTeam: new Page('/Club/Players/Player.aspx', 'OTHER_TEAM'),
  playerDetailOwnTeam: new Page('/Club/Players/Player.aspx', 'OWN_TEAM'),
  playerListOtherTeam: new Page('/Club/Players/', 'OTHER_TEAM'),
  playerListOwnTeam: new Page('/Club/Players/', 'OWN_TEAM'),
  // Pages that don't need to distinguish between the user's own team and other teams yet
  youthPlayer: new Page('/Club/Players/YouthPlayer.aspx'),
  youthPlayers: new Page('/Club/Players/YouthPlayers.aspx'),
} as const satisfies Record<string, Page>

/**
 * Checks if the given page matches the current browser location.
 */
export const isPage = (page: Page): boolean => {
  if (page.pathname !== getCurrentPathname()) return false
  if (page.teamContext === undefined) return true
  if (page.teamContext === 'OWN_TEAM') return isOwnTeamPage()
  return !isOwnTeamPage() // OTHER_TEAM
}

/**
 * Returns the current page based on the browser's location.
 *
 * @throws {@link Error} If the current page is not in {@link pages}
 */
export const getCurrentPage = (): Page => {
  const page = Object.values(pages).find((page) => isPage(page))
  if (page === undefined) throw new Error('The current page is not supported')

  return page
}
