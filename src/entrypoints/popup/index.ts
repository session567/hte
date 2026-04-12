import { el } from '@/common/utils/dom'
import { allMetadata } from '@/common/utils/metadata'
import { getSetting, setSetting } from '@/common/utils/settings'
import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const modules = allMetadata.filter(({ excludeFromPopup }) => !excludeFromPopup)

const renderModule = async ({ id: moduleId, name, description, settings }: ModuleMetadata): Promise<HTMLElement> => {
  const toggleId = `module-${moduleId}-enabled`
  const extraSettings = Object.entries(settings ?? {})

  const [isEnabled, ...settingValues] = await Promise.all([
    getSetting(moduleId, 'enabled'),
    ...extraSettings.map(([settingId]) => getSetting(moduleId, settingId)),
  ])

  const header = el('div', { className: 'module-header hte-mb-1' })
  const dataset = { moduleId, settingId: 'enabled' }
  header.append(
    el('input', { type: 'checkbox', id: toggleId, checked: isEnabled, dataset }),
    el('label', { htmlFor: toggleId, className: 'enabled-toggle' }),
    el('div', { className: 'name', textContent: name }),
  )

  const card = el('div', { className: 'module hte-py-3 hte-px-4' })
  card.append(header, el('div', { className: 'description', textContent: description }))

  if (extraSettings.length > 0) {
    const extraSettingsRows = extraSettings.map(([settingId, { label }], i) => {
      const row = el('div', { className: 'setting' })
      const checkboxId = `module-${moduleId}-${settingId}`
      const dataset = { moduleId, settingId }
      row.append(
        el('input', { type: 'checkbox', id: checkboxId, checked: settingValues[i], dataset }),
        el('label', { htmlFor: checkboxId, textContent: label }),
      )

      return row
    })

    const extraSettingsSection = el('div', { className: 'settings hte-mt-2' })
    extraSettingsSection.append(...extraSettingsRows)
    card.append(extraSettingsSection)
  }

  return card
}

const moduleList = document.getElementById('moduleList')

if (moduleList) {
  const cards = await Promise.all(modules.map(renderModule))
  moduleList.append(...cards)

  moduleList.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    if (target.type !== 'checkbox') return

    const { moduleId, settingId } = target.dataset
    if (!moduleId || !settingId) return

    setSetting(moduleId, settingId, target.checked).catch((err: unknown) => {
      console.error('Failed to save setting', err)
    })
  })
}
