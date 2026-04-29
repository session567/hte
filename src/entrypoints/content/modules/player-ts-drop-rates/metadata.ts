import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'player-ts-drop-rates',
  name: 'Player Team Spirit Drop',
  description: 'Show the likelihood of a team spirit drop when buying or selling a player based on their personality',
} as const satisfies ModuleMetadata

export default metadata
