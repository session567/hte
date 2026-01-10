import { beforeEach, vi } from 'vitest'

vi.stubGlobal('__VERSION__', '1.2.3')
vi.stubGlobal('chrome', {
  i18n: {
    getMessage: vi.fn(),
  },
})

vi.mock('@common/utils/logger')
vi.mock('@common/utils/storage')

beforeEach(() => {
  document.body.innerHTML = ''
})
