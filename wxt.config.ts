import { readFileSync } from 'fs'
import { defineConfig } from 'wxt'

type PackageJson = {
  version: string
}

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as PackageJson

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/i18n/module'],
  manifest: {
    name: 'HTE - Hattrick Enhanced',
    default_locale: 'en',
    browser_specific_settings: {
      gecko: {
        id: '{d7e1035f-903c-4013-bc7a-59ad3c8a8194}',
      },
    },
  },
  srcDir: 'src',
  vite: () => ({
    define: {
      __VERSION__: JSON.stringify(pkg.version),
      __DEV__: import.meta.env.DEV_MODE ?? false,
    },
  }),
})
