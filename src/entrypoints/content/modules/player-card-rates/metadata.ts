import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'player-card-rates',
  name: 'Player Card Rates',
  description: 'Show the likelihood of a player receiving a yellow or red card based on their personality',
} as const satisfies ModuleMetadata

export default metadata
