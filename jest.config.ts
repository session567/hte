import type { Config } from 'jest'
import { createDefaultPreset } from 'ts-jest'

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Indicates whether each individual test should be reported during the run. All errors will also still be shown on
  // the bottom after execution.
  verbose: true,
  transform: {
    ...createDefaultPreset().transform,
  },
}

export default config
