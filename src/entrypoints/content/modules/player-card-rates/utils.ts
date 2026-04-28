import { querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { RED_CARD_RATES, YELLOW_CARD_RATES } from '@/entrypoints/content/modules/player-card-rates/constants'

export const getPersonalityLevel = (playerInfo: Element, lt: 'aggressiveness' | 'honesty'): number | null => {
  const link = querySelectorIn<HTMLAnchorElement>(playerInfo, `a.skill[href*="lt=${lt}"]`, false)
  if (!link) return null

  const ll = new URL(link.href).searchParams.get('ll')
  if (!ll) return null

  return parseInt(ll, 10)
}

export const getCardRates = (aggressiveness: number, honesty: number): { yellow: number; red: number } | null => {
  if (aggressiveness >= YELLOW_CARD_RATES.length || honesty >= YELLOW_CARD_RATES[0].length) return null
  return { yellow: YELLOW_CARD_RATES[aggressiveness][honesty], red: RED_CARD_RATES[aggressiveness][honesty] }
}

export const formatRate = (value: number): string => {
  const fixed = value.toFixed(2)
  return `${parseFloat(fixed)}%`.replace('.', ',')
}
