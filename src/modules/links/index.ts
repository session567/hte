import '@modules/links/index.css'

import type { Module } from '@common/types/module'
import { querySelector } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { logger } from '@common/utils/logger'
import { getCurrentPage } from '@common/utils/pages'
import { createSidebarBox } from '@common/utils/sidebar/box'
import { linkMap } from '@modules/links/constants'
import { replacePlaceholders } from '@modules/links/utils'

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
    const { box, boxBody } = createSidebarBox(t('links_title'))

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
