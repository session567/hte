import { querySelectorIn, waitForElement } from '@/entrypoints/content/common/utils/dom'

export const getHtMatch = async (): Promise<Element | null> => waitForElement('ht-match')

export const isPreMatch = (htMatch: Element): boolean => querySelectorIn(htMatch, '.match-h2h', false) !== null

export const isWalkoverMatch = (htMatch: Element): boolean => {
  const matchLive = querySelectorIn<HTMLSpanElement>(htMatch, '.live-matchtime')
  // Angular renders empty elements as HTML comment nodes
  return matchLive?.innerHTML === '<!---->'
}

export const isLiveMatch = (htMatch: Element): boolean => {
  const matchStatus = querySelectorIn<HTMLDivElement>(htMatch, '.live-matchstatus')
  return matchStatus !== null && matchStatus.getAttribute('hidden') === null
}
