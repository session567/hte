import '@/entrypoints/content/modules/links/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { getCurrentPage } from '@/entrypoints/content/common/utils/pages'
import { createSidebarBox } from '@/entrypoints/content/common/utils/sidebar/box'
import { linkMap } from '@/entrypoints/content/modules/links/constants'
import { replacePlaceholders } from '@/entrypoints/content/modules/links/utils'

/**
 * Display relevant links to external tools in the sidebar.
 */
const links: Module = {
  name: 'Links',
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
      const anchor = document.createElement('a')

      try {
        anchor.href = replacePlaceholders(link.url, replacements)
      } catch (err) {
        logger.error(err)
        return
      }

      anchor.textContent = link.name
      anchor.target = '_blank'

      boxBody.appendChild(anchor)
    })

    sidebar.insertBefore(box, sidebar.firstChild)
  },
}

export default links
