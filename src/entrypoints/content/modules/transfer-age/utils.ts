export const settingsStorage = storage.defineItem<{ red: number; orange: number; enabled: boolean }>(
  'local:transfer-age-settings',
  {
    fallback: { orange: 80, red: 90, enabled: false },
    version: 1,
  },
)
