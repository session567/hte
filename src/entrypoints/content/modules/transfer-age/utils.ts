export const DEFAULTS = { orange: 80, red: 90, enabled: false } as const

export const settingsStorage = storage.defineItem<{ red: number; orange: number; enabled: boolean }>(
  'local:transfer-age-settings',
  {
    fallback: DEFAULTS,
    version: 1,
  },
)
