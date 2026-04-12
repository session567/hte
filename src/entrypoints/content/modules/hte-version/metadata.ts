import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'hte-version',
  name: 'HTE Version',
  description: 'Display the HTE version in the page footer.',
  excludeFromPopup: true,
} as const satisfies ModuleMetadata

export default metadata
