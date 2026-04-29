import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'htms-points',
  group: 'player',
  name: 'HTMS Points',
  description: 'Display HTMS points (ability and potential) for players.',
} as const satisfies ModuleMetadata

export default metadata
