import { describe, expect, it } from 'vitest'

import hteVersion from '@/entrypoints/content/modules/hte-version/index'

describe('hte-version module', () => {
  it("displays HTE's version in Hattrick's footer", () => {
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
