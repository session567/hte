import '@/entrypoints/content/modules/links/index.css'

import { el } from '@/common/utils/dom'
import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { getCurrentPage } from '@/entrypoints/content/common/utils/pages'
import { createSidebarBox } from '@/entrypoints/content/common/utils/sidebar/box'
import { linkMap } from '@/entrypoints/content/modules/links/constants'
import metadata from '@/entrypoints/content/modules/links/metadata'
import { replacePlaceholders } from '@/entrypoints/content/modules/links/utils'

/**
 * Display relevant links to external tools in the sidebar.
 */
const links: Module = {
  metadata,
  pages: [...linkMap.keys()],
  run: () => {
    const sidebar = querySelector<HTMLDivElement>('#sidebar')
    if (!sidebar) return

    const currentPage = getCurrentPage()
    const linkData = linkMap.get(currentPage)

    if (!linkData) {
      logger.warn(`${currentPage} does not have any links.`)
      return
    }

    const replacements = linkData.getReplacements?.() ?? {}
    const { box, boxBody } = createSidebarBox(i18n.t('links_title'))

    linkData.links.forEach((link) => {
      try {
        const href = replacePlaceholders(link.url, replacements)
        const anchor = el('a', { href, textContent: link.name, target: '_blank' })
        boxBody.appendChild(anchor)
      } catch (err) {
        logger.error(err)
        return
      }
    })

    sidebar.insertBefore(box, sidebar.firstChild)
  },
}

export default links
