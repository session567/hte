import { Page } from '@common/utils/pages'

export interface Module {
  name: string
  pages: Page[]
  run: () => void
}
