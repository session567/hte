import { DAYS_PER_SEASON, DAYS_PER_WEEK } from '@common/utils/constants'
import { logger } from '@common/utils/logger'

const HATTRICK_START_DATE = new Date(1997, 8, 22)
// Format: DD.MM.YYYY HH:mm
const REGEX_DATE_LONG = /(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})/
// Format: DD.MM.YYYY
const REGEX_DATE_SHORT = /(\d{2})\.(\d{2})\.(\d{4})/

export const parseDate = (element: Element): Date | null => {
  const value = element.textContent.trim()
  if (!value) return null

  const longMatch = REGEX_DATE_LONG.exec(value)

  if (longMatch) {
    const [, day, month, year, hour, minute] = longMatch.map((m) => parseInt(m, 10))

    return new Date(year, month - 1, day, hour, minute)
  }

  const shortMatch = REGEX_DATE_SHORT.exec(value)

  if (shortMatch) {
    const [, day, month, year] = shortMatch.map((m) => parseInt(m, 10))

    return new Date(year, month - 1, day)
  }

  logger.warn(`Unknown date format: ${value}`)

  return null
}

export const calcWeekNumber = (date: Date): number => {
  const daysSinceStart = Math.floor((date.getTime() - HATTRICK_START_DATE.getTime()) / (1000 * 60 * 60 * 24))
  const dayWithinSeason = daysSinceStart % DAYS_PER_SEASON

  return Math.floor(dayWithinSeason / DAYS_PER_WEEK) + 1
}
