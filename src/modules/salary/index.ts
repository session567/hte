import { Module } from '@common/types/module'
import { WEEKS_PER_SEASON } from '@common/utils/constants'
import { querySelector } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { pages } from '@common/utils/pages'
import { formatThousands, parseSalaryAndCurency } from '@modules/salary/utils'

/**
 * Display yearly salary next to the weekly salary on the player detail page.
 */
const salary: Module = {
  name: 'Salary',
  pages: [pages.playerDetailAllTeams],
  run: () => {
    const salaryCell = querySelector('.transferPlayerInformation table tr:nth-child(2) td:nth-child(2)')
    if (!salaryCell) return

    const parsed = parseSalaryAndCurency(salaryCell)
    if (!parsed) return

    const yearlySalary = parsed.weeklySalary * WEEKS_PER_SEASON
    const div = document.createElement('div')
    div.className = 'shy'
    div.textContent = `${formatThousands(yearlySalary)} ${parsed.currency}/${t('salary.per_season')}`

    salaryCell.appendChild(div)
  },
}

export default salary
