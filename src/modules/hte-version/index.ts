import { Module } from '@common/types/module'
import { querySelector } from '@common/utils/dom'
import { pages } from '@common/utils/pages'
import packageJson from '@root/package.json'

const hteVersion: Module = {
  name: 'HTE Version',
  pages: [pages.all],
  run: () => {
    const currentServer = querySelector('#bottom .currentServer')
    if (!currentServer) return

    const versionText = document.createTextNode(` | HTE v${packageJson.version}`)
    currentServer.appendChild(versionText)
  },
}

export default hteVersion
