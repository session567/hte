import { DAYS_PER_WEEK, DAYS_PER_YEAR } from '@common/utils/constants'
import { logger } from '@common/utils/logger'

const HATTRICK_START_DATE = new Date(1997, 8, 22)
// Format: DD.MM.YYYY HH:mm
const DATE_REGEX_LONG = /(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})/
// Format: DD.MM.YYYY
const DATE_REGEX_SHORT = /(\d{2})\.(\d{2})\.(\d{4})/

export const parseDate = (node: ParentNode): Date | null => {
  const value = node.textContent?.trim()
  if (!value) return null

  const longMatch = value.match(DATE_REGEX_LONG)

  if (longMatch) {
    const [, day, month, year, hour, minute] = longMatch.map((m) => parseInt(m, 10))

    return new Date(year, month - 1, day, hour, minute)
  }

  const shortMatch = value.match(DATE_REGEX_SHORT)

  if (shortMatch) {
    const [, day, month, year] = shortMatch.map((m) => parseInt(m, 10))

    return new Date(year, month - 1, day)
  }

  logger.warn(`Unknown date format: ${value}`)

  return null
}

export const calcWeekNumber = (date: Date): number => {
  const daysSinceStart = Math.floor((date.getTime() - HATTRICK_START_DATE.getTime()) / (1000 * 60 * 60 * 24))
  const dayWithinSeason = daysSinceStart % DAYS_PER_YEAR

  return Math.floor(dayWithinSeason / DAYS_PER_WEEK) + 1
}
