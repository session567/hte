import salary from '@modules/salary'

describe('salary module', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should add yearly salary to the player page', () => {
    document.body.innerHTML = `
      <div class="transferPlayerInformation">
        <table>
          <tbody>
            <tr>
              <td>TSI</td>
              <td>450</td>
            </tr>
            <tr>
              <td>Wage</td>
              <td>1 500 €/week</td>
            </tr>
          </tbody>
        </table>
      </div>
    `

    salary.run()

    const salaryCell = document.querySelector('.transferPlayerInformation table tr:nth-child(2) td:nth-child(2)')
    const yearlyDiv = salaryCell?.querySelector('div.shy')
    expect(yearlyDiv?.textContent).toBe('24 000 €/salaryPerSeason')
  })
})
