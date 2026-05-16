import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'match-go-to-matches',
  group: 'match',
  name: 'Go to Matches',
  description: "Add a link to the opponent's matches on the match order page.",
} as const satisfies ModuleMetadata

export default metadata
