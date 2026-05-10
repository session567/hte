export const DEFAULTS = { orange: 80, red: 90 } as const

export const thresholdsStorage = storage.defineItem<{ red: number; orange: number }>('local:transfer-age-thresholds', {
  fallback: DEFAULTS,
  version: 1,
})
