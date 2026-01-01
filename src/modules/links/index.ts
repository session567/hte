import '@modules/links/index.css'

import { Module } from '@common/types/module'
import { t } from '@common/utils/i18n'
import { getCurrentPath } from '@common/utils/paths'
import { LINKS, MODULE_NAME } from '@modules/links/constants'

const links: Module = {
  name: MODULE_NAME,
  routes: Object.keys(LINKS),
  run: () => {
    const sidebar = document.querySelector<HTMLDivElement>('#sidebar')
    if (!sidebar) return

    const links = LINKS[getCurrentPath()]

    const box = document.createElement('div')
    box.className = 'box sidebarBox'

    const boxHead = document.createElement('div')
    boxHead.className = 'boxHead'

    const headIcon = document.createElement('span')
    headIcon.className = 'header-icon hte-header-icon'
    headIcon.innerHTML = 'HTE'

    const h2 = document.createElement('h2')
    h2.textContent = t('links')

    boxHead.appendChild(headIcon)
    boxHead.appendChild(h2)

    const boxBody = document.createElement('div')
    boxBody.className = 'boxBody'

    links.forEach((link) => {
      const anchor = document.createElement('a')
      anchor.href = link.url
      anchor.textContent = link.name
      anchor.target = '_blank'

      boxBody.appendChild(anchor)
    })

    const boxFooter = document.createElement('div')
    boxFooter.className = 'boxFooter'
    boxFooter.innerHTML = '&nbsp;'

    box.appendChild(boxHead)
    box.appendChild(boxBody)
    box.appendChild(boxFooter)

    sidebar.insertBefore(box, sidebar.firstChild)
  },
}

export default links
