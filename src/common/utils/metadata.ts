import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

export const allMetadata = Object.values(
  import.meta.glob<{ default: ModuleMetadata }>('@/entrypoints/content/modules/*/metadata.ts', { eager: true }),
).map((m) => m.default)
