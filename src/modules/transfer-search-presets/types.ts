import { BOOLEAN_FIELD_IDS, RADIO_FIELD_NAMES, STRING_FIELD_IDS } from './constants'

export type Preset = Record<(typeof STRING_FIELD_IDS)[number], string> &
  Record<(typeof BOOLEAN_FIELD_IDS)[number], boolean> &
  Record<(typeof RADIO_FIELD_NAMES)[number], string>

export type PresetMap = Record<string, Preset>
