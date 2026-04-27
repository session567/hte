import { Page, PageOptions, PageTree } from '@/entrypoints/content/common/utils/pages/page'

/**
 * Create a pair of {@link Page} instances for a pathname available for both own and other teams.
 */
const teamPages = (pathname: string, options?: Omit<PageOptions, 'teamContext'>) => {
  const own = new Page(pathname, { ...options, teamContext: 'OWN_TEAM' })
  const other = new Page(pathname, { ...options, teamContext: 'OTHER_TEAM' })
  return { own, other }
}

/**
 * Dictionary of all supported Hattrick pages.
 */
export const pages = {
  all: new Page(Page.__ALL__),
  appDenominations: new Page('/Help/Rules/AppDenominations.aspx'),
  club: new Page('/Club/'),
  clubYouth: new Page('/Club/Youth/'),
  fans: new Page('/Club/Fans/'),
  forum: new Page('/Forum/'),
  matchArchive: new Page('/Club/Matches/Archive.aspx'),
  matchDetail: {
    senior: new Page('/Club/Matches/Match.aspx'),
    youth: new Page('/Club/Matches/Match.aspx', { queryParams: [{ name: 'YouthTeamId' }] }),
  },
  matchList: {
    senior: teamPages('/Club/Matches/'),
    youth: teamPages('/Club/Matches/', { queryParams: [{ name: 'YouthTeamId' }] }),
  },
  matchOrder: new Page('/Club/Matches/MatchOrder/MatchOrder.aspx'),
  playerDetail: {
    senior: teamPages('/Club/Players/Player.aspx'),
    youth: teamPages('/Club/Players/YouthPlayer.aspx'),
  },
  playerList: {
    senior: teamPages('/Club/Players/'),
    youth: teamPages('/Club/Players/YouthPlayers.aspx'),
  },
  series: new Page('/World/Series/'),
  specialists: new Page('/Club/Specialists/'),
  stadium: new Page('/Club/Stadium/'),
  stadiumUsage: new Page('/Club/Stadium/StadiumUsage.aspx'),
  transferSearch: new Page('/World/Transfers/'),
  transferSearchResults: new Page('/World/Transfers/TransfersSearchResult.aspx'),
} as const satisfies Record<string, PageTree>
