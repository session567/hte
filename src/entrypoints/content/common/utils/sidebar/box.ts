import { el } from '@/common/utils/dom'

/**
 * Create a sidebar box matching Hattrick's UI.
 *
 * @param title - The title text to display in the box header
 * @returns Object containing the box element and its body element for adding content
 */
export const createSidebarBox = (title: string) => {
  const boxHead = el('div', { className: 'boxHead' })
  boxHead.append(
    el('span', { className: 'header-icon hte-header-icon', innerHTML: 'HTE' }),
    el('h2', { textContent: title }),
  )

  const box = el('div', { className: 'box sidebarBox' })
  const boxBody = el('div', { className: 'boxBody' })
  box.append(boxHead, boxBody, el('div', { className: 'boxFooter', innerHTML: '&nbsp;' }))

  return { box, boxBody }
}
