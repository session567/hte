import { defineConfig } from 'vitest/config'
import { WxtVitest } from 'wxt/testing/vitest-plugin'

export default defineConfig({
  plugins: [WxtVitest()],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/common/test/setup.ts'],
    globals: true,
    css: false,
    include: ['src/**/*.test.ts'],
    clearMocks: true,
  },
})
