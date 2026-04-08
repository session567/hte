import { allMetadata } from '@/common/utils/metadata'
import { getSetting, setSetting } from '@/common/utils/settings'
import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const popupMetadata = allMetadata.filter(({ excludeFromPopup }) => !excludeFromPopup)

const renderModule = async ({ id: moduleId, name, description, settings }: ModuleMetadata): Promise<string> => {
  const enabledId = `module-${moduleId}-enabled`
  const settingEntries = Object.entries(settings ?? {})

  const [enabledValue, ...extraValues] = await Promise.all([
    getSetting(moduleId, 'enabled'),
    ...settingEntries.map(([settingId]) => getSetting(moduleId, settingId)),
  ])

  const extraSettingsHtml: string[] = settingEntries.map(
    ([settingId, { label: settingLabel }], i) => `
        <div class="setting">
          <input
            type="checkbox"
            id="module-${moduleId}-${settingId}"
            data-module-id="${moduleId}"
            data-setting-id="${settingId}"
            ${extraValues[i] ? 'checked' : ''}
          >
          <label for="module-${moduleId}-${settingId}">${settingLabel}</label>
        </div>
      `,
  )

  const settingsSection = extraSettingsHtml.length
    ? `<div class="settings hte-mt-2">${extraSettingsHtml.join('')}</div>`
    : ''

  return `
      <div class="module hte-py-3 hte-px-4">
        <div class="module-header hte-mb-1">
          <input
            type="checkbox"
            id="${enabledId}"
            data-module-id="${moduleId}"
            data-setting-id="enabled"
            ${enabledValue ? 'checked' : ''}
          >
          <label for="${enabledId}" class="enabled-toggle" aria-label="Enable ${name}"></label>
          <div class="name">${name}</div>
        </div>
        <div class="description">${description}</div>
        ${settingsSection}
      </div>
    `
}

const moduleList = document.getElementById('moduleList')

if (moduleList) {
  const moduleHtml = await Promise.all(popupMetadata.map(renderModule))
  moduleList.innerHTML = moduleHtml.join('')

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
