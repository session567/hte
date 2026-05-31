import { allMetadata } from '@/common/utils/metadata'

const settingKey = (moduleId: string, settingId: string) => `${moduleId}:${settingId}`

const buildDefaultSettings = (): Record<string, boolean | number> => {
  const defaults: Record<string, boolean | number> = {}

  for (const metadata of allMetadata) {
    defaults[settingKey(metadata.id, 'enabled')] = true

    for (const [key, value] of Object.entries(metadata.settings ?? {})) {
      defaults[settingKey(metadata.id, key)] = value.default
    }
  }

  return defaults
}

const defaultSettings = buildDefaultSettings()

const settingsStorage = storage.defineItem<Record<string, boolean | number>>('local:settings', {
  fallback: {},
  version: 1,
})

const getSettings = (() => {
  let promise: Promise<Record<string, boolean | number>> | null = null

  settingsStorage.watch(() => {
    promise = null
  })

  return () => {
    promise ??= settingsStorage
      .getValue()
      .then((stored) => ({ ...defaultSettings, ...stored }))
      .catch((err: unknown) => {
        promise = null
        throw err
      })
    return promise
  }
})()

const getSetting = async <T extends boolean | number>(moduleId: string, setting: string): Promise<T> => {
  const key = settingKey(moduleId, setting)
  const settings = await getSettings()

  if (!(key in settings)) throw new Error(`Setting ${key} does not exist`)

  return settings[key] as T
}

export const getBoolSetting = (moduleId: string, setting: string): Promise<boolean> =>
  getSetting<boolean>(moduleId, setting)

export const getIntSetting = (moduleId: string, setting: string): Promise<number> =>
  getSetting<number>(moduleId, setting)

let writeQueue = Promise.resolve()

export const setSetting = (moduleId: string, setting: string, value: boolean | number): Promise<void> => {
  const key = settingKey(moduleId, setting)

  if (!(key in defaultSettings)) throw new Error(`Setting ${key} does not exist`)

  const nextWrite = writeQueue.then(async () => {
    const stored = await settingsStorage.getValue()
    await settingsStorage.setValue({ ...stored, [key]: value })
  })
  writeQueue = nextWrite.catch((err: unknown) => {
    console.error(`Failed to save setting ${key}`, err)
  })
  return nextWrite
}
