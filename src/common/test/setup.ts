globalThis.chrome = {
  i18n: {
    getMessage: jest.fn(),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

jest.mock('@common/utils/logger', () => ({
  ...jest.requireActual('@common/utils/logger'),
  createLogger: jest.fn(() => ({
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  })),
}))

jest.mock('@common/utils/paths', () => ({
  ...jest.requireActual('@common/utils/paths'),
  getCurrentPath: jest.fn(),
}))
