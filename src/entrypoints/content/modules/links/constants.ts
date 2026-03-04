import { Page, pages } from '@/entrypoints/content/common/utils/pages'
import { getPageSeriesId } from '@/entrypoints/content/common/utils/series/utils'
import { getOwnTeamData } from '@/entrypoints/content/common/utils/team/utils'

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

export const ENTERPRISE_CONSTRUCTION_ONLINE: Link = {
  name: 'Enterprise Construction Online rev.II',
  url: 'https://nrgjack.altervista.org/tools/eco',
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

export const HT_SCORE: Link = {
  name: 'HT Score',
  url: 'https://htscore.org/seriespredict/?series_season={seriesId}',
}

export const SCOUTRICK: Link = {
  name: 'Scoutrick',
  url: 'https://www.scoutrick.org/',
}

export const linkMap = new Map<Page, LinkData>([
  [pages.club, { links: [HATTID_TEAM], getReplacements: getOwnTeamData }],
  [pages.matchList.senior.own, { links: [DHTH] }],
  [pages.playerDetail.senior.own, { links: [HATTRICK_PORTAL_TRACKER, HATTRICK_CYCLE_PLANNER] }],
  [pages.playerList.senior.own, { links: [HATTRICK_PORTAL_TRACKER, HATTRICK_CYCLE_PLANNER] }],
  [pages.series, { links: [HATTID_LEAGUE, HT_SCORE], getReplacements: () => ({ seriesId: getPageSeriesId() }) }],
  [pages.stadium, { links: [ENTERPRISE_CONSTRUCTION_ONLINE] }],
  [pages.playerDetail.youth.own, { links: [HATTRICK_YOUTHCLUB, SCOUTRICK] }],
  [pages.playerList.youth.own, { links: [HATTRICK_YOUTHCLUB, SCOUTRICK] }],
])
