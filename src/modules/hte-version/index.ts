import { Module } from '@common/types/module'
import { querySelector } from '@common/utils/dom'
import { pages } from '@common/utils/pages'

declare const __VERSION__: string

const hteVersion: Module = {
  name: 'HTE Version',
  pages: [pages.all],
  run: () => {
    const currentServer = querySelector('#bottom .currentServer')
    if (!currentServer) return

    const versionText = document.createTextNode(` | HTE v${__VERSION__}`)
    currentServer.appendChild(versionText)
  },
}

export default hteVersion
