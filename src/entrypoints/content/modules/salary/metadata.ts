import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'salary',
  name: 'Salary',
  description: "Display the player's yearly salary next to weekly salary on the player detail page.",
} as const satisfies ModuleMetadata

export default metadata
