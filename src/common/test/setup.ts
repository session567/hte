globalThis.chrome = {
  i18n: {
    getMessage: jest.fn(),
  },
} as unknown as typeof globalThis.chrome

jest.mock(
  '@common/utils/logger',
  () =>
    ({
      ...jest.requireActual('@common/utils/logger'),
      logger: {
        debug: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      },
    }) as typeof import('@common/utils/logger'),
)

jest.mock('@common/utils/storage', () => ({
  storage: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}))

jest.mock('@common/utils/location')
