import { vi } from 'vitest'

import { isPage, Page } from '@/entrypoints/content/common/utils/pages'

/**
 * Helper for creating a DOM element with the HTML content for testing.
 *
 * @param html - HTML string to set as innerHTML
 * @returns A DOM element
 */
export const createElement = (html: string): HTMLDivElement => {
  const div = document.createElement('div')
  div.innerHTML = html

  return div
}

export const mockIsPage = (page: Page) => {
  vi.mocked(isPage).mockImplementation((...pages: Page[]) => pages.includes(page))
}
