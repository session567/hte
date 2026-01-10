import hteVersion from '@modules/hte-version'
import { describe, expect, test } from 'vitest'

describe('hte-version module', () => {
  test("displays HTE's version in Hattrick's footer", () => {
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
