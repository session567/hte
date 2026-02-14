import { afterEach, vi } from 'vitest'

vi.stubGlobal('__VERSION__', '1.2.3')

vi.mock('#i18n', () => ({
  i18n: {
    t: vi.fn((key: string) => {
      return key
    }),
  },
}))
vi.mock('@/entrypoints/content/common/utils/logger')
vi.mock('@/entrypoints/content/common/utils/storage')

afterEach(() => {
  document.body.innerHTML = ''
})
