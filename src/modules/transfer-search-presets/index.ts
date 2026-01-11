import '@modules/transfer-search-presets/index.css'

import type { Module } from '@common/types/module'
import { getElementById, getElementsByName, querySelector } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { logger } from '@common/utils/logger'
import { pages } from '@common/utils/pages'
import { createSidebarBox } from '@common/utils/sidebar/box'
import { storage } from '@common/utils/storage'
import { BOOLEAN_FIELD_IDS, RADIO_FIELD_NAMES, STRING_FIELD_IDS } from '@modules/transfer-search-presets/constants'

export type Preset = Record<(typeof STRING_FIELD_IDS)[number], string> &
  Record<(typeof BOOLEAN_FIELD_IDS)[number], boolean> &
  Record<(typeof RADIO_FIELD_NAMES)[number], string>

type PresetMap = Record<string, Preset>

const STORAGE_KEY = 'transferSearchPresets'

/**
 * Fetch transfer search presets from storage.
 *
 * @returns Map of preset names to presets
 */
const fetchPresetsFromStorage = async (): Promise<PresetMap> => {
  return (await storage.get<PresetMap>(STORAGE_KEY)) ?? {}
}

/**
 * Save transfer search presets to storage.
 *
 * @param presetMap - Map of preset names to presets
 */
const savePresetsToStorage = async (presetMap: PresetMap): Promise<void> => {
  await storage.set(STORAGE_KEY, presetMap)
}

/**
 * Extract current form values as a preset.
 *
 * @returns Preset from form fields
 */
const extractPresetFromForm = () => {
  const preset: Partial<Preset> = {}

  STRING_FIELD_IDS.forEach((id) => {
    const element = getElementById<HTMLInputElement | HTMLSelectElement>(id)
    if (element) preset[id] = element.value
  })

  BOOLEAN_FIELD_IDS.forEach((id) => {
    const element = getElementById<HTMLInputElement>(id)
    if (element) preset[id] = element.checked
  })

  RADIO_FIELD_NAMES.forEach((name) => {
    const elements = getElementsByName<HTMLInputElement>(name)
    const checkedRadio = Array.from(elements).find((radio) => radio.checked)

    if (checkedRadio) preset[name] = checkedRadio.value
  })

  return preset as Preset
}

/**
 * Apply a preset to the transfer search form.
 *
 * @param preset - Preset to apply
 */
const applyPresetToForm = (preset: Preset) => {
  logger.debug('Applying preset to form', preset)

  STRING_FIELD_IDS.forEach((id) => {
    const element = getElementById<HTMLInputElement | HTMLSelectElement>(id)
    if (element) element.value = preset[id]
  })

  BOOLEAN_FIELD_IDS.forEach((id) => {
    const element = getElementById<HTMLInputElement>(id)
    if (!element) return

    if (preset[id]) {
      element.setAttribute('checked', 'checked')
    } else {
      element.removeAttribute('checked')
    }
  })

  RADIO_FIELD_NAMES.forEach((name) => {
    const elements = getElementsByName<HTMLInputElement>(name)

    elements.forEach((element) => {
      if (element.value === preset[name]) {
        element.setAttribute('checked', 'checked')
      } else {
        element.removeAttribute('checked')
      }
    })
  })
}

/**
 * Render the preset list in the sidebar.
 *
 * @param boxBody - Container element for preset list
 * @param onPresetChange - Callback to re-render when presets change
 */
const renderPresets = async (boxBody: HTMLDivElement, onPresetChange: () => Promise<void>) => {
  boxBody.innerHTML = ''

  const presetMap = await fetchPresetsFromStorage()
  const hasPresets = Object.keys(presetMap).length > 0

  Object.entries(presetMap).forEach(([name, preset]) => {
    const row = document.createElement('div')
    row.className = 'hte-preset-row'

    const presetLink = document.createElement('a')
    presetLink.textContent = name
    presetLink.className = 'hte-preset-link'
    presetLink.onclick = () => {
      applyPresetToForm(preset)
    }

    const deletePresetSpan = document.createElement('span')
    deletePresetSpan.className = 'hte-preset-delete'
    deletePresetSpan.onclick = async () => {
      const presetMap = await fetchPresetsFromStorage()
      const { [name]: _, ...remainingPresets } = presetMap
      await savePresetsToStorage(remainingPresets)
      await onPresetChange()
    }

    row.appendChild(presetLink)
    row.appendChild(deletePresetSpan)
    boxBody.appendChild(row)
  })

  const addPresetLink = document.createElement('a')
  addPresetLink.textContent = t('transfer_search_presets_add_button')
  addPresetLink.className = `hte-preset-link ${hasPresets ? 'hte-mt-2' : ''}`
  addPresetLink.onclick = async () => {
    const name = prompt(t('transfer_search_presets_name_prompt'))
    if (!name) return

    const preset = extractPresetFromForm()
    const presetMap = await fetchPresetsFromStorage()
    presetMap[name] = preset
    await savePresetsToStorage(presetMap)
    await onPresetChange()
  }

  boxBody.appendChild(addPresetLink)
}

/**
 * Save and reuse transfer search filters.
 */
const transferSearchPresets: Module = {
  name: 'Transfer Search Presets',
  pages: [pages.transfers],
  run: () => {
    const sidebar = querySelector<HTMLDivElement>('#sidebar')
    if (!sidebar) return

    const { box, boxBody } = createSidebarBox(t('transfer_search_presets_title'))
    sidebar.appendChild(box)

    const render = async () => renderPresets(boxBody, render)
    void render()
  },
}

export default transferSearchPresets
