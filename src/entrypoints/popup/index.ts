import { el } from '@/common/utils/dom'
import { allMetadata } from '@/common/utils/metadata'
import { getBoolSetting, getIntSetting, setSetting } from '@/common/utils/settings'
import type { ModuleMetadata, ModuleSetting } from '@/entrypoints/content/common/types/module'

const modules = allMetadata.filter(({ excludeFromPopup }) => !excludeFromPopup)

/**
 * Number input with custom increment/decrement buttons replacing the native browser controls, which are hidden via CSS.
 */
const renderNumberInput = (
  id: string,
  dataset: Record<string, string>,
  value: number,
  min?: number,
  max?: number,
): HTMLElement => {
  const input = el('input', { type: 'number', id, dataset, value: String(value) })
  if (min !== undefined) input.min = String(min)
  if (max !== undefined) input.max = String(max)

  const clamp = (v: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, v))

  const step = (delta: number) => {
    input.value = String(clamp((input.valueAsNumber || 0) + delta))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  const makeStepBtn = (direction: 'up' | 'down', delta: number) => {
    const btn = el('button', { type: 'button', className: `number-input-${direction}` })
    btn.append(el('span', { className: `hte-icon-chevron-${direction}` }))
    btn.addEventListener('click', () => {
      step(delta)
    })
    return btn
  }

  const controls = el('div', { className: 'number-input-controls' })
  controls.append(makeStepBtn('up', 1), makeStepBtn('down', -1))

  const wrapper = el('div', { className: 'number-input-wrapper' })
  wrapper.append(input, controls)

  return wrapper
}

const renderSettingRow = (
  moduleId: string,
  settingId: string,
  setting: ModuleSetting,
  value: boolean | number,
): HTMLElement => {
  const row = el('div', { className: 'setting' })
  const inputId = `module-${moduleId}-${settingId}`
  const dataset = { moduleId, settingId }

  if (typeof setting.default === 'number') {
    row.append(
      renderNumberInput(inputId, dataset, value as number, setting.min, setting.max),
      el('label', { htmlFor: inputId, textContent: setting.label }),
    )
  } else {
    row.append(
      el('input', { type: 'checkbox', id: inputId, checked: value as boolean, dataset }),
      el('label', { htmlFor: inputId, textContent: setting.label }),
    )
  }

  return row
}

const renderModule = async ({ id: moduleId, name, description, settings }: ModuleMetadata): Promise<HTMLElement> => {
  const toggleId = `module-${moduleId}-enabled`
  const extraSettings = Object.entries(settings ?? {})

  const [isEnabled, ...settingValues] = await Promise.all([
    getBoolSetting(moduleId, 'enabled'),
    ...extraSettings.map(([settingId, setting]) =>
      typeof setting.default === 'number' ? getIntSetting(moduleId, settingId) : getBoolSetting(moduleId, settingId),
    ),
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
    const extraSettingsRows = extraSettings.map(([settingId, setting], i) =>
      renderSettingRow(moduleId, settingId, setting, settingValues[i]),
    )

    const extraSettingsSection = el('div', { className: 'settings hte-mt-2' })
    extraSettingsSection.append(...extraSettingsRows)
    card.append(extraSettingsSection)
  }

  return card
}

const renderGroup = async (group: string, groupModules: ModuleMetadata[]): Promise<HTMLElement> => {
  const section = el('div', { className: 'module-group' })
  const heading = el('div', { className: 'module-group-heading', textContent: group })
  const cards = await Promise.all(groupModules.map(renderModule))
  section.append(heading, ...cards)

  return section
}

const moduleList = document.getElementById('moduleList')

if (moduleList) {
  const groups = [...new Set(modules.map((m) => m.group))]
    .sort((a, b) => a.localeCompare(b))
    .map((group) => ({
      group,
      modules: modules.filter((m) => m.group === group),
    }))

  const sections = await Promise.all(groups.map(({ group, modules }) => renderGroup(group, modules)))
  moduleList.append(...sections)

  moduleList.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    const { moduleId, settingId } = target.dataset
    if (!moduleId || !settingId) return

    let value: boolean | number = target.type === 'checkbox' ? target.checked : target.valueAsNumber
    if (typeof value === 'number' && isNaN(value)) return
    if (typeof value === 'number') {
      // HTML min/max attributes only constrain the spinner buttons; values typed directly into the field are not
      // clamped by the browser. Without this, a user typing 999 into a field with max=111 would persist an out-of-range
      // value.
      const min = target.min ? Number(target.min) : -Infinity
      const max = target.max ? Number(target.max) : Infinity
      value = Math.min(max, Math.max(min, value))
    }

    setSetting(moduleId, settingId, value).catch((err: unknown) => {
      console.error('Failed to save setting', err)
    })
  })
}
