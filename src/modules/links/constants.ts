export type Link = {
  name: string
  url: string
}

export const ALLOWED_PLACEHOLDERS = ['teamId', 'seriesId']

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
