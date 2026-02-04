import { afterEach, vi } from 'vitest'

vi.stubGlobal('__VERSION__', '1.2.3')

vi.mock('webextension-polyfill', () => ({
  default: {
    i18n: {
      getMessage: vi.fn(),
    },
  },
}))
vi.mock('@common/utils/logger')
vi.mock('@common/utils/storage')

afterEach(() => {
  document.body.innerHTML = ''
})
