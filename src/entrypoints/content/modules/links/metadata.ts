import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'links',
  group: 'general',
  name: 'Links',
  description: 'Display links to external tools in the sidebar.',
} as const satisfies ModuleMetadata

export default metadata
