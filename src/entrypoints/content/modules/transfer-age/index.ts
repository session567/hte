import '@/entrypoints/content/modules/transfer-age/index.css'

import { el } from '@/common/utils/dom'
import type { Module } from '@/entrypoints/content/common/types/module'
import { DAYS_PER_SEASON } from '@/entrypoints/content/common/utils/constants'
import { querySelector, querySelectorAll, querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { parsePlayerAge } from '@/entrypoints/content/common/utils/player/utils'
import metadata from '@/entrypoints/content/modules/transfer-age/metadata'
import { settingsStorage } from '@/entrypoints/content/modules/transfer-age/utils'

const createThresholdControl = (
  color: 'orange' | 'red',
  value: number,
): { label: HTMLLabelElement; input: HTMLInputElement } => {
  const label = el('label', { className: 'hte-transfer-age-label' })
  const swatch = el('span', { className: `hte-transfer-age-swatch hte-transfer-age-swatch-${color}` })
  const input = el('input', {
    type: 'number',
    className: 'hte-transfer-age-input',
    min: '0',
    max: String(DAYS_PER_SEASON - 1),
    value: String(value),
  })
  label.append(swatch, ` ${i18n.t('transfer_age_older_than')} `, input, ` ${i18n.t('transfer_age_days')}`)

  return { label, input }
}

const clearHighlights = (): void => {
  querySelectorAll<HTMLElement>('.hte-transfer-age', false).forEach((cell) => {
    cell.classList.remove(
      'hte-transfer-age',
      'hte-transfer-age-red',
      'hte-transfer-age-orange',
      'hte-transfer-age-green',
    )
  })
}

const injectSettingsPanel = (enabled: boolean, red: number, orange: number): void => {
  querySelector('#hte-transfer-age-settings', false)?.remove()

  const { label: orangeLabel, input: orangeInput } = createThresholdControl('orange', orange)
  const { label: redLabel, input: redInput } = createThresholdControl('red', red)

  const enabledButton = el('span', { className: `hte-transfer-age-toggle${enabled ? ' hte-transfer-age-active' : ''}` })
  enabledButton.append(el('i', { className: 'hte-icon-highlighter' }))

  const thresholds = el('div', { className: 'hte-transfer-age-thresholds' })
  thresholds.append(orangeLabel, redLabel)

  const panel = el('div', { id: 'hte-transfer-age-settings' })
  if (!enabled) panel.classList.add('hte-transfer-age-disabled')
  panel.append(enabledButton, thresholds)

  const onThresholdChange = () => {
    const newOrange = parseInt(orangeInput.value, 10)
    const newRed = parseInt(redInput.value, 10)
    if (isNaN(newOrange) || isNaN(newRed)) return

    const isEnabled = enabledButton.classList.contains('hte-transfer-age-active')
    void settingsStorage.setValue({ red: newRed, orange: newOrange, enabled: isEnabled }).then(() => {
      if (isEnabled) applyHighlights(newRed, newOrange)
    })
  }

  const onEnabledChange = () => {
    const newEnabled = enabledButton.classList.toggle('hte-transfer-age-active')
    const newOrange = parseInt(orangeInput.value, 10)
    const newRed = parseInt(redInput.value, 10)
    const areThresholdsValid = !isNaN(newRed) && !isNaN(newOrange)

    panel.classList.toggle('hte-transfer-age-disabled', !newEnabled)

    if (areThresholdsValid) void settingsStorage.setValue({ red: newRed, orange: newOrange, enabled: newEnabled })
    if (newEnabled && areThresholdsValid) applyHighlights(newRed, newOrange)
    if (!newEnabled) clearHighlights()
  }

  orangeInput.addEventListener('change', onThresholdChange)
  redInput.addEventListener('change', onThresholdChange)
  enabledButton.addEventListener('click', onEnabledChange)

  querySelector('#ctl00_ctl00_CPContent_CPMain_ucPager_divWrapper .PagerRight_Default')?.prepend(panel)
}

const applyHighlights = (red: number, orange: number): void => {
  const players = querySelectorAll<HTMLElement>('.transferPlayerInformation', false)

  players.forEach((player) => {
    const ageCell = querySelectorIn<HTMLTableCellElement>(player, 'table tr:nth-child(2) td:nth-child(2)', false)
    if (!ageCell) return

    const age = parsePlayerAge(ageCell)
    if (!age) return

    const { days } = age
    const className =
      days >= red ? 'hte-transfer-age-red' : days >= orange ? 'hte-transfer-age-orange' : 'hte-transfer-age-green'

    ageCell.classList.remove('hte-transfer-age-red', 'hte-transfer-age-orange', 'hte-transfer-age-green')
    ageCell.classList.add('hte-transfer-age', className)
  })
}

const transferAge: Module = {
  metadata,
  pages: [pages.transferSearchResults],
  run: async () => {
    const { enabled, red, orange } = await settingsStorage.getValue()
    injectSettingsPanel(enabled, red, orange)
    if (enabled) applyHighlights(red, orange)
  },
}

export default transferAge
