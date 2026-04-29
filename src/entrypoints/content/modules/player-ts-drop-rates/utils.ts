import { BUY_TS_DROP_RATES, SELL_TS_DROP_RATES } from '@/entrypoints/content/modules/player-ts-drop-rates/constants'

export const getTsDropRates = (gentleness: number): { buy: number; sell: number } | null => {
  if (gentleness < 0 || gentleness >= BUY_TS_DROP_RATES.length) return null
  return { buy: BUY_TS_DROP_RATES[gentleness], sell: SELL_TS_DROP_RATES[gentleness] }
}
