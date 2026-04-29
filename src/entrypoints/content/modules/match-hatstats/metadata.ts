import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'hatstats',
  group: 'match',
  name: 'HatStats',
  description: 'Display HatStats.',
} as const satisfies ModuleMetadata

export default metadata
