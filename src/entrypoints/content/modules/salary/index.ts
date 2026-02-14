import type { Module } from '@/entrypoints/content/common/types/module'
import { WEEKS_PER_SEASON } from '@/entrypoints/content/common/utils/constants'
import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { formatThousands, parseSalaryAndCurency } from '@/entrypoints/content/modules/salary/utils'

/**
 * Display the player's yearly salary next to weekly salary on the player detail page.
 */
const salary: Module = {
  name: 'Salary',
  pages: [pages.playerDetailOwnTeam, pages.playerDetailOtherTeam],
  run: () => {
    const salaryCell = querySelector('.transferPlayerInformation table tr:nth-child(2) td:nth-child(2)')
    if (!salaryCell) return

    const parsed = parseSalaryAndCurency(salaryCell)
    if (!parsed) return

    const yearlySalary = parsed.weeklySalary * WEEKS_PER_SEASON
    const div = document.createElement('div')
    div.className = 'shy'
    div.textContent = `${formatThousands(yearlySalary)} ${parsed.currency}/${i18n.t('salary_per_season')}`

    salaryCell.appendChild(div)
  },
}

export default salary
