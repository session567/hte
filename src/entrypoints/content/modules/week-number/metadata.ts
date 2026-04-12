import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'week-number',
  name: 'Week Number',
  description: 'Display week numbers next to dates throughout Hattrick.',
} as const satisfies ModuleMetadata

export default metadata
