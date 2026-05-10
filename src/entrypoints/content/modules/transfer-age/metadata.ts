import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'transfer-age',
  group: 'transfer',
  name: 'Transfer Age',
  description: 'Color player ages on transfer search results to highlight players that are close to aging up.',
} as const satisfies ModuleMetadata

export default metadata
