import hteVersion from '@modules/hte-version'

describe('hte-version module', () => {
  beforeAll(() => {
    Object.defineProperty(globalThis, '__VERSION__', {
      value: '1.2.3',
      writable: true,
    })
  })

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
    expect(currentServer?.textContent).toBe('Server 1 | HTE v1.2.3')
  })
})
