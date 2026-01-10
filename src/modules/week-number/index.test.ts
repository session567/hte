import weekNumber from '@modules/week-number'
import { describe, expect, test } from 'vitest'

describe('week-number module', () => {
  test.each([
    { dateString: '16.12.2025 19:30', expected: ' (W2)' },
    { dateString: '23.12.2025', expected: ' (W3)' },
  ])('adds week number after date: $dateString', ({ dateString, expected }) => {
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="date">${dateString}</div>
      </div>
    `

    weekNumber.run()

    const span = document.querySelector<HTMLSpanElement>('.date > span.hte-week-number')
    expect(span?.textContent).toBe(expected)
  })

  test("doesn't add week number for invalid date", () => {
    document.body.innerHTML = `
      <div id="mainBody">
        <div class="date">invalid date</div>
      </div>
    `
    const originalHTML = document.body.innerHTML

    weekNumber.run()

    expect(document.body.innerHTML).toBe(originalHTML)
  })
})
