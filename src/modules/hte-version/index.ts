import { Module } from '@common/types/module'
import { VERSION } from '@common/utils/constants'
import { querySelector } from '@common/utils/dom'
import { pages } from '@common/utils/pages'

/**
 * Display the HTE version in the page footer.
 */
const hteVersion: Module = {
  name: 'HTE Version',
  pages: [pages.all],
  run: () => {
    const currentServer = querySelector('#bottom .currentServer')
    if (!currentServer) return

    const versionText = document.createTextNode(` | HTE v${VERSION}`)
    currentServer.appendChild(versionText)
  },
}

export default hteVersion
