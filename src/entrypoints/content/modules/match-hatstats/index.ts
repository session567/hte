import '@/entrypoints/content/modules/match-hatstats/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import { pages } from '@/entrypoints/content/common/utils/pages'
import runMatchDetail from '@/entrypoints/content/modules/match-hatstats/handlers/match-detail'
import runMatchOrder from '@/entrypoints/content/modules/match-hatstats/handlers/match-order'
import metadata from '@/entrypoints/content/modules/match-hatstats/metadata'

const hatstats: Module = {
  metadata,
  pages: new Map([
    [pages.matchDetail.senior, runMatchDetail],
    [pages.matchOrder, runMatchOrder],
  ]),
}

export default hatstats
