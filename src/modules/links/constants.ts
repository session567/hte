import { Page, pages } from '@common/utils/pages'
import { getPageSeriesId } from '@common/utils/series/utils'
import { getOwnTeamData } from '@common/utils/team/utils'

export type Link = {
  name: string
  url: string
}

type LinkData = {
  links: Link[]
  getReplacements?: () => Record<string, string | null>
}

export const DHTH: Link = {
  name: "DHTH - Danni's Hattrick Helper",
  url: 'https://dhth.net',
}

export const HATTID_LEAGUE: Link = {
  name: 'Hattid',
  url: 'https://hattid.com/leagueUnit/{seriesId}',
}

export const HATTID_TEAM: Link = {
  name: 'Hattid',
  url: 'https://hattid.com/team/{teamId}',
}

export const HATTRICK_CYCLE_PLANNER: Link = {
  name: 'Hattrick Cycle Planner',
  url: 'https://ht-cycle-planner.vercel.app',
}

export const HATTRICK_PORTAL_TRACKER: Link = {
  name: 'Hattrick Portal - Tracker',
  url: 'https://hattrickportal.online/Tracker',
}

export const HATTRICK_YOUTHCLUB: Link = {
  name: 'Hattrick Youthclub',
  url: 'https://www.hattrick-youthclub.org',
}

export const NICKARANA_LEAGUE_SIMULATOR: Link = {
  name: "Nickarana's League & Match Simulator",
  url: 'https://nickarana.pythonanywhere.com/seriespredict/?series_season={seriesId}',
}

export const SCOUTRICK: Link = {
  name: 'Scoutrick',
  url: 'https://www.scoutrick.org/',
}

export const linkMap = new Map<Page, LinkData>([
  [pages.club, { links: [HATTID_TEAM], getReplacements: getOwnTeamData }],
  [pages.matches, { links: [DHTH] }],
  [pages.playerDetailOwnTeam, { links: [HATTRICK_PORTAL_TRACKER, HATTRICK_CYCLE_PLANNER] }],
  [pages.playerListOwnTeam, { links: [HATTRICK_PORTAL_TRACKER, HATTRICK_CYCLE_PLANNER] }],
  [
    pages.series,
    { links: [HATTID_LEAGUE, NICKARANA_LEAGUE_SIMULATOR], getReplacements: () => ({ seriesId: getPageSeriesId() }) },
  ],
  [pages.youthPlayer, { links: [HATTRICK_YOUTHCLUB, SCOUTRICK] }],
  [pages.youthPlayers, { links: [HATTRICK_YOUTHCLUB, SCOUTRICK] }],
])
