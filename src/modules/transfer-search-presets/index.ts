import '@modules/transfer-search-presets/index.css'

import type { Module } from '@common/types/module'
import { getElementById, getElementsByName, querySelector } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { logger } from '@common/utils/logger'
import { pages } from '@common/utils/pages'
import { createSidebarBox } from '@common/utils/sidebar/box'
import { storage } from '@common/utils/storage'
import { BOOLEAN_FIELD_IDS, RADIO_FIELD_NAMES, STRING_FIELD_IDS } from '@modules/transfer-search-presets/constants'
import { Preset, PresetMap } from '@modules/transfer-search-presets/types'

const STORAGE_KEY = 'transferSearchPresets'

const fetchPresetsFromStorage = async (): Promise<PresetMap> => {
  return (await storage.get<PresetMap>(STORAGE_KEY)) ?? {}
}

const savePresetsToStorage = async (presetMap: PresetMap): Promise<void> => {
  await storage.set(STORAGE_KEY, presetMap)
}

const extractPresetFromForm = () => {
  const preset: Partial<Preset> = {}

  STRING_FIELD_IDS.forEach((id) => {
    const el = getElementById<HTMLInputElement | HTMLSelectElement>(id)
    if (el) preset[id] = el.value
  })

  BOOLEAN_FIELD_IDS.forEach((id) => {
    const el = getElementById<HTMLInputElement>(id)
    if (el) preset[id] = el.checked
  })

  RADIO_FIELD_NAMES.forEach((name) => {
    const elements = getElementsByName<HTMLInputElement>(name)
    const checkedRadio = Array.from(elements).find((radio) => radio.checked)

    if (checkedRadio) preset[name] = checkedRadio.value
  })

  return preset as Preset
}

const applyPresetToForm = (preset: Preset) => {
  logger.debug('Applying preset to form', preset)

  STRING_FIELD_IDS.forEach((id) => {
    const el = getElementById<HTMLInputElement | HTMLSelectElement>(id)
    if (el) el.value = preset[id]
  })

  BOOLEAN_FIELD_IDS.forEach((id) => {
    const el = getElementById<HTMLInputElement>(id)
    if (!el) return

    if (preset[id]) {
      el.setAttribute('checked', 'checked')
    } else {
      el.removeAttribute('checked')
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
  addPresetLink.textContent = t('transfer_search_presets.add_button')
  addPresetLink.className = `hte-preset-link ${hasPresets ? 'hte-mt-2' : ''}`
  addPresetLink.onclick = async () => {
    const name = prompt(t('transfer_search_presets.name_prompt'))
    if (!name) return

    const preset = extractPresetFromForm()
    const presetMap = await fetchPresetsFromStorage()
    presetMap[name] = preset
    await savePresetsToStorage(presetMap)
    await onPresetChange()
  }

  boxBody.appendChild(addPresetLink)
}

const transferSearchPresets: Module = {
  name: 'Transfer Search Presets',
  pages: [pages.transfers],
  run: () => {
    const sidebar = querySelector<HTMLDivElement>('#sidebar')
    if (!sidebar) return

    const { box, boxBody } = createSidebarBox(t('transfer_search_presets.title'))
    sidebar.appendChild(box)

    const render = async () => renderPresets(boxBody, render)
    void render()
  },
}

export default transferSearchPresets
