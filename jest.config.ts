import type { Config } from 'jest'
import { createDefaultPreset } from 'ts-jest'

const config: Config = {
  clearMocks: true,
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
  },
  setupFiles: ['<rootDir>/src/common/test/setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    ...createDefaultPreset().transform,
  },
  verbose: true,
}

export default config
