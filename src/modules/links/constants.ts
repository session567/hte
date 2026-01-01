import { paths } from '@common/utils/paths'

interface Link {
  name: string
  url: string
}

export const MODULE_NAME = 'Links'

const ARENA_CALCULATOR: Link = {
  name: 'Arena Calculator',
  url: 'https://ht.alergromania.ro/tools/arena-calculator',
}

const DHTH: Link = {
  name: "DHTH - Danni's Hattrick Helper",
  url: 'https://dhth.net',
}

const HATTID: Link = {
  name: 'Hattid',
  url: 'https://hattid.com',
}

const HATTRICK_CYCLE_PLANNER: Link = {
  name: 'Hattrick Cycle Planner',
  url: 'https://ht-cycle-planner.vercel.app',
}

const HATTRICK_PORTAL_TRACKER: Link = {
  name: 'Hattrick Portal - Tracker',
  url: 'https://hattrickportal.online/Tracker',
}

const HATTRICK_YOUTHCLUB: Link = {
  name: 'Hattrick Youthclub',
  url: 'https://www.hattrick-youthclub.org',
}

const NICKARANA_SIMULATOR: Link = {
  name: "Nickarana's League & Match Simulator",
  url: 'https://nickarana.pythonanywhere.com',
}

const PLAYER_INTO_COACH_CONVERSION_COST: Link = {
  name: 'Player to Coach Conversion Cost',
  url: 'https://ht.alergromania.ro/tools/player-into-coach-cost',
}

const RATE_MY_ACADEMY: Link = {
  name: 'Rate My Academy',
  url: 'https://www.rate-my.academy',
}

const TS_ORGANIZER: Link = {
  name: 'TS Organizer',
  url: 'https://ht.alergromania.ro/tools/team-spirit-organizer',
}

export const LINKS: Record<string, Link[]> = {
  [paths.matches]: [NICKARANA_SIMULATOR, DHTH, TS_ORGANIZER],
  [paths.player]: [HATTRICK_PORTAL_TRACKER, HATTRICK_CYCLE_PLANNER],
  [paths.players]: [HATTID, HATTRICK_PORTAL_TRACKER, HATTRICK_CYCLE_PLANNER],
  [paths.series]: [HATTID, NICKARANA_SIMULATOR],
  [paths.specialists]: [PLAYER_INTO_COACH_CONVERSION_COST],
  [paths.stadium]: [ARENA_CALCULATOR],
  [paths.youthPlayer]: [HATTRICK_YOUTHCLUB, RATE_MY_ACADEMY],
  [paths.youthPlayers]: [HATTRICK_YOUTHCLUB, RATE_MY_ACADEMY],
}
