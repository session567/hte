import { DAYS_PER_SEASON } from '@common/utils/constants'
import { storage } from '@common/utils/storage'
import transferSearchPresets, { Preset } from '@modules/transfer-search-presets'
import { BOOLEAN_FIELD_IDS, RADIO_FIELD_NAMES, STRING_FIELD_IDS } from '@modules/transfer-search-presets/constants'
import { describe, expect, test, vi } from 'vitest'

vi.mock('@common/utils/storage')

const AGE_MIN = 17
const AGE_MAX = 99

const buildHTML = (): string => {
  const ageOptions =
    '<option value="-1">-1</option>' +
    Array.from({ length: AGE_MAX - AGE_MIN + 1 }, (_, i) => AGE_MIN + i)
      .map((age) => `<option value="${age}">${age}</option>`)
      .join('')

  const ageDaysOptions = Array.from({ length: DAYS_PER_SEASON }, (_, i) => i)
    .map((i) => `<option value="${i}">${i}</option>`)
    .join('')

  const skillOptions = Array.from({ length: 22 }, (_, i) => i - 1)
    .map((i) => `<option value="${i}">${i}</option>`)
    .join('')

  return `
    <div id="mainBody">
      <select id="ctl00_ctl00_CPContent_CPMain_ddlAgeMin"> ${ageOptions} </select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlAgeDaysMin">${ageDaysOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlAgeMax"> ${ageOptions} </select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlAgeDaysMax">${ageDaysOptions}</select>

      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkillSearchType">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>

      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill1">${skillOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill1Min">${skillOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill1Max">${skillOptions}</select>

      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill2">${skillOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill2Min">${skillOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill2Max">${skillOptions}</select>

      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill3">${skillOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill3Min">${skillOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill3Max">${skillOptions}</select>

      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill4">${skillOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill4Min">${skillOptions}</select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlSkill4Max">${skillOptions}</select>

      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkSpecialty1">
      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkSpecialty2">
      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkSpecialty3">
      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkSpecialty4">
      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkSpecialty5">
      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkSpecialty6">
      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkSpecialty8">
      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkSpecialty0">

      <input type="text" id="ctl00_ctl00_CPContent_CPMain_txtBidMax" value="0">

      <select id="ctl00_ctl00_CPContent_CPMain_ddlBornIn">
        <option value="-1">-1</option>
        <option value="45">Country 45</option>
      </select>
      <select id="ctl00_ctl00_CPContent_CPMain_ddlContinent">
        <option value="-1">-1</option>
        <option value="4">Continent 4</option>
      </select>

      <input type="text" id="ctl00_ctl00_CPContent_CPMain_txtTSIMin_text" value="0">
      <input type="text" id="ctl00_ctl00_CPContent_CPMain_txtTSIMax_text" value="0">

      <input type="text" id="ctl00_ctl00_CPContent_CPMain_txtSalaryMin" value="0">
      <input type="text" id="ctl00_ctl00_CPContent_CPMain_txtSalaryMax" value="0">

      <input type="text" id="ctl00_ctl00_CPContent_CPMain_txtTransferCompareAvgMin" value="0">
      <input type="text" id="ctl00_ctl00_CPContent_CPMain_txtTransferCompareAvgMax" value="0">

      <input type="checkbox" id="ctl00_ctl00_CPContent_CPMain_chkUseGlobalMax">
      <select id="ctl00_ctl00_CPContent_CPMain_ddlGlobalSkillMax">${skillOptions}</select>

      <input type="radio" id="ctl00_ctl00_CPContent_CPMain_rdSort_0" name="ctl00$ctl00$CPContent$CPMain$rdSort" value="ASC">
      <input type="radio" id="ctl00_ctl00_CPContent_CPMain_rdSort_1" name="ctl00$ctl00$CPContent$CPMain$rdSort" value="DESC">
    </div>
    <div id="sidebar"></div>
  `
}

describe('transfer-search-presets module', () => {
  test('renders sidebar box with "Add preset" link when no presets exist', async () => {
    document.body.innerHTML = '<div id="sidebar"></div>'
    vi.mocked(storage).get.mockResolvedValue(null)

    transferSearchPresets.run()

    await vi.waitFor(() => {
      expect(document.querySelector('#sidebar .box .hte-preset-link')).not.toBeNull()
    })

    const box = document.querySelector('#sidebar .box')
    const header = box?.querySelector('h2')
    expect(header?.textContent).toBe('transfer_search_presets_title')

    const addPresetLink = box?.querySelector('.hte-preset-link')
    expect(addPresetLink?.textContent).toBe('transfer_search_presets_add_button')
    expect(addPresetLink?.classList.contains('hte-mt-2')).toBe(false)
  })

  test('renders existing presets', async () => {
    document.body.innerHTML = '<div id="sidebar"></div>'
    vi.mocked(storage).get.mockResolvedValue({ 'Test Preset': { foo: 'bar' } })

    transferSearchPresets.run()

    await vi.waitFor(() => {
      expect(document.querySelector('#sidebar .box .hte-preset-link')).not.toBeNull()
    })

    const box = document.querySelector('#sidebar .box')
    const presetRow = box?.querySelector('.hte-preset-row')
    const presetLink = presetRow?.querySelector('.hte-preset-link')
    expect(presetLink?.textContent).toBe('Test Preset')

    const deleteButton = presetRow?.querySelector('.hte-preset-delete')
    expect(deleteButton).not.toBeNull()

    const addPresetLink = box?.querySelector('.hte-preset-link.hte-mt-2')
    expect(addPresetLink?.textContent).toBe('transfer_search_presets_add_button')
  })

  test('populates form fields when a preset is clicked', async () => {
    document.body.innerHTML = buildHTML()

    const preset: Preset = {
      ctl00_ctl00_CPContent_CPMain_ddlAgeMin: '20',
      ctl00_ctl00_CPContent_CPMain_ddlAgeDaysMin: '4',
      ctl00_ctl00_CPContent_CPMain_ddlAgeMax: '25',
      ctl00_ctl00_CPContent_CPMain_ddlAgeDaysMax: '103',
      ctl00_ctl00_CPContent_CPMain_ddlSkillSearchType: '0',
      ctl00_ctl00_CPContent_CPMain_ddlSkill1: '4',
      ctl00_ctl00_CPContent_CPMain_ddlSkill1Min: '3',
      ctl00_ctl00_CPContent_CPMain_ddlSkill1Max: '6',
      ctl00_ctl00_CPContent_CPMain_ddlSkill2: '3',
      ctl00_ctl00_CPContent_CPMain_ddlSkill2Min: '3',
      ctl00_ctl00_CPContent_CPMain_ddlSkill2Max: '15',
      ctl00_ctl00_CPContent_CPMain_ddlSkill3: '6',
      ctl00_ctl00_CPContent_CPMain_ddlSkill3Min: '2',
      ctl00_ctl00_CPContent_CPMain_ddlSkill3Max: '15',
      ctl00_ctl00_CPContent_CPMain_ddlSkill4: '7',
      ctl00_ctl00_CPContent_CPMain_ddlSkill4Min: '5',
      ctl00_ctl00_CPContent_CPMain_ddlSkill4Max: '20',
      ctl00_ctl00_CPContent_CPMain_txtBidMax: '300 000',
      ctl00_ctl00_CPContent_CPMain_ddlBornIn: '45',
      ctl00_ctl00_CPContent_CPMain_ddlContinent: '4',
      ctl00_ctl00_CPContent_CPMain_txtTSIMin_text: '1',
      ctl00_ctl00_CPContent_CPMain_txtTSIMax_text: '2',
      ctl00_ctl00_CPContent_CPMain_txtSalaryMin: '3',
      ctl00_ctl00_CPContent_CPMain_txtSalaryMax: '4',
      ctl00_ctl00_CPContent_CPMain_txtTransferCompareAvgMin: '5',
      ctl00_ctl00_CPContent_CPMain_txtTransferCompareAvgMax: '6',
      ctl00_ctl00_CPContent_CPMain_ddlGlobalSkillMax: '12',
      ctl00_ctl00_CPContent_CPMain_chkSpecialty1: false,
      ctl00_ctl00_CPContent_CPMain_chkSpecialty2: false,
      ctl00_ctl00_CPContent_CPMain_chkSpecialty3: true,
      ctl00_ctl00_CPContent_CPMain_chkSpecialty4: false,
      ctl00_ctl00_CPContent_CPMain_chkSpecialty5: false,
      ctl00_ctl00_CPContent_CPMain_chkSpecialty6: true,
      ctl00_ctl00_CPContent_CPMain_chkSpecialty8: false,
      ctl00_ctl00_CPContent_CPMain_chkSpecialty0: false,
      ctl00_ctl00_CPContent_CPMain_chkUseGlobalMax: true,
      ctl00$ctl00$CPContent$CPMain$rdSort: 'DESC',
    }
    vi.mocked(storage).get.mockResolvedValue({ 'My Preset': preset })

    transferSearchPresets.run()

    await vi.waitFor(() => {
      expect(document.querySelector('#sidebar .box .hte-preset-link')).not.toBeNull()
    })

    const box = document.querySelector('#sidebar .box')
    const presetLink = box?.querySelector<HTMLAnchorElement>('.hte-preset-link')
    expect(presetLink?.textContent).toBe('My Preset')

    presetLink?.click()

    STRING_FIELD_IDS.forEach((id) => {
      const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement
      expect({ [id]: element.value }).toEqual({ [id]: preset[id] })
    })

    BOOLEAN_FIELD_IDS.forEach((id) => {
      const element = document.getElementById(id) as HTMLInputElement
      expect({ [id]: element.hasAttribute('checked') }).toEqual({ [id]: preset[id] })
    })

    RADIO_FIELD_NAMES.forEach((name) => {
      const elements = document.getElementsByName(name) as NodeListOf<HTMLInputElement>
      const checkedElement = Array.from(elements).find((el) => el.hasAttribute('checked'))
      expect({ [name]: checkedElement?.value }).toEqual({ [name]: preset[name] })
    })
  })
})
