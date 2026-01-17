import { DenominationType } from '@modules/denomination/types'

export const DENOMINATION_TYPES = [
  'aggressiveness',
  'confidence',
  'FanMatch',
  'FanMood',
  'FanSeason',
  'gentleness',
  'honesty',
  'leadership',
  'morale',
  'skill',
] as const

export const PERSONALITY_TYPES = new Set<DenominationType>(['gentleness', 'honesty', 'aggressiveness'])

export const MAX_VALUES: Record<DenominationType, number> = {
  aggressiveness: 6,
  confidence: 9,
  FanMatch: 10,
  FanMood: 11,
  FanSeason: 7,
  gentleness: 6,
  honesty: 6,
  leadership: 7,
  morale: 10,
  skill: 20,
}
