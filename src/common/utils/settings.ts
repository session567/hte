import { allMetadata } from '@/common/utils/metadata'

const settingKey = (moduleId: string, settingId: string) => `${moduleId}:${settingId}`

const buildDefaultSettings = (): Record<string, boolean> => {
  const defaults: Record<string, boolean> = {}

  for (const metadata of allMetadata) {
    defaults[settingKey(metadata.id, 'enabled')] = true

    for (const [key, value] of Object.entries(metadata.settings ?? {})) {
      defaults[settingKey(metadata.id, key)] = value.default
    }
  }

  return defaults
}

const defaultSettings = buildDefaultSettings()

const settingsStorage = storage.defineItem<Record<string, boolean>>('local:settings', { fallback: {}, version: 1 })

const getSettings = (() => {
  let promise: Promise<Record<string, boolean>> | null = null

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

export const getSetting = async (moduleId: string, setting: string): Promise<boolean> => {
  const key = settingKey(moduleId, setting)
  const settings = await getSettings()

  if (!(key in settings)) throw new Error(`Setting ${key} does not exist`)

  return settings[key]
}

let writeQueue = Promise.resolve()

export const setSetting = (moduleId: string, setting: string, value: boolean): Promise<void> => {
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
