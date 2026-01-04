globalThis.chrome = {
  i18n: {
    getMessage: jest.fn(),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

jest.mock('@common/utils/logger', () => ({
  ...jest.requireActual('@common/utils/logger'),
  logger: {
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('@common/utils/storage', () => ({
  storage: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}))

jest.mock('@common/utils/location')
