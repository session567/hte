import { Module } from '@common/types/module'
import { paths } from '@common/utils/paths'
import packageJson from '@root/package.json'

const hteVersion: Module = {
  name: 'HTE Version',
  paths: [paths.all],
  run: () => {
    const currentServer = document.querySelector('#bottom .currentServer')
    if (!currentServer) return

    const versionText = document.createTextNode(` | HTE v${packageJson.version}`)
    currentServer.appendChild(versionText)
  },
}

export default hteVersion
