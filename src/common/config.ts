type Config = {
  disabledModules: string[]
}

const defaultConfig: Config = {
  disabledModules: [],
}

export const getConfig = () => storage.getItem<Config>('local:config', { fallback: defaultConfig })

export const setConfig = (config: Config) => storage.setItem('local:config', config)
