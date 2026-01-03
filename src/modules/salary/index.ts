import { Module } from '@common/types/module'
import { WEEKS_PER_YEAR } from '@common/utils/constants'
import { t } from '@common/utils/i18n'
import { paths } from '@common/utils/paths'
import { numberWithSpaces, parseSalaryAndCurency } from '@modules/salary/utils'

const salary: Module = {
  name: 'Salary',
  paths: [paths.player],
  run: () => {
    const salaryCell = document.querySelector('.transferPlayerInformation table tr:nth-child(2) td:nth-child(2)')
    if (!salaryCell) return

    const parsed = parseSalaryAndCurency(salaryCell)
    if (!parsed) return

    const yearlySalary = parsed.weeklySalary * WEEKS_PER_YEAR
    const div = document.createElement('div')
    div.className = 'shy'
    div.textContent = `${numberWithSpaces(yearlySalary)} ${parsed.currency}/${t('salaryPerSeason')}`

    salaryCell.appendChild(div)
  },
}

export default salary
