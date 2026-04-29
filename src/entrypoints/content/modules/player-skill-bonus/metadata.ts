import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const metadata = {
  id: 'skill-bonus',
  group: 'player',
  name: 'Skill Bonus',
  description: 'Extend player skill bars to include loyalty and homegrown bonuses.',
} as const satisfies ModuleMetadata

export default metadata
