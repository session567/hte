/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'
import path from 'path'

const pkg = readJsonFile('package.json')

function generateManifest() {
  const manifest = readJsonFile('src/manifest.json')
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  }
}

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(pkg.version),
    __DEV__: process.env.DEV_MODE || false,
  },
  plugins: [
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ['package.json', 'manifest.json'],
      browser: process.env.TARGET || 'firefox',
      // @ts-ignore
      webExtConfig: {
        startUrl: ['https://www.hattrick.org', 'https://stage.hattrick.org'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@common': path.resolve(__dirname, './src/common'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/common/test/setup.ts'],
    globals: true,
    css: false,
    include: ['src/**/*.test.ts'],
    clearMocks: true,
  },
})
