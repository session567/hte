import hteVersion from '@modules/hte-version'
import packageJson from '@root/package.json'

describe('hte-version module', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should add version text to currentServer element', () => {
    document.body.innerHTML = `
      <div id="bottom">
        <div class="currentServer">Server 1</div>
      </div>
    `

    hteVersion.run()

    const currentServer = document.querySelector('#bottom .currentServer')
    expect(currentServer?.textContent).toBe(`Server 1 | HTE v${packageJson.version}`)
  })
})
