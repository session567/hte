import { RED_CARD_RATES, YELLOW_CARD_RATES } from '@/entrypoints/content/modules/player-card-rates/constants'

export const getCardRates = (aggressiveness: number, honesty: number): { yellow: number; red: number } | null => {
  if (aggressiveness >= YELLOW_CARD_RATES.length || honesty >= YELLOW_CARD_RATES[0].length) return null
  return { yellow: YELLOW_CARD_RATES[aggressiveness][honesty], red: RED_CARD_RATES[aggressiveness][honesty] }
}
