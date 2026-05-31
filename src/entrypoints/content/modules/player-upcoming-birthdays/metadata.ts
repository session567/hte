import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'player-upcoming-birthdays',
  group: 'player',
  name: 'Upcoming Birthdays',
  description: 'Show a sidebar box listing players close to their birthday.',
  settings: {
    threshold: { label: 'Show players older than N days', default: 90, min: 0, max: 111 },
  },
} as const satisfies ModuleMetadata

export default metadata
