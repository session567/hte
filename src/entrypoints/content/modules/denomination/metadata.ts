import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'denomination',
  group: 'general',
  name: 'Denomination',
  description: 'Display numeric values next to all team and player abilities.',
  settings: {
    reverseAggressiveness: { label: 'Reverse aggressiveness scale', default: true },
  },
} as const satisfies ModuleMetadata

export default metadata
