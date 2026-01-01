import weekNumber from '@modules/week-number'

afterEach(() => {
  document.body.innerHTML = ''
})

test.each([
  { dateString: '16.12.2025 19:30', expected: '(W2)' },
  { dateString: '23.12.2025', expected: '(W3)' },
])('should add  number after date: $dateString', ({ dateString, expected }) => {
  document.body.innerHTML = `<div class="date">${dateString}</div>`

  weekNumber.run()

  const span = document.querySelector<HTMLSpanElement>('.date > span.hte-week-number')
  expect(span?.textContent).toBe(expected)
})
