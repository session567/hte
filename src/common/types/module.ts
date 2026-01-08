import { Page } from '@common/utils/pages'

export type Module = {
  name: string
  pages: Page[]
  run: () => void
}
