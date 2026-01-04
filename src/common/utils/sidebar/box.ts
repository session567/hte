export const createSidebarBox = (title: string) => {
  const box = document.createElement('div')
  box.className = 'box sidebarBox'

  const boxHead = document.createElement('div')
  boxHead.className = 'boxHead'

  const headIcon = document.createElement('span')
  headIcon.className = 'header-icon hte-header-icon'
  headIcon.innerHTML = 'HTE'

  const h2 = document.createElement('h2')
  h2.textContent = title

  boxHead.appendChild(headIcon)
  boxHead.appendChild(h2)

  const boxBody = document.createElement('div')
  boxBody.className = 'boxBody'

  const boxFooter = document.createElement('div')
  boxFooter.className = 'boxFooter'
  boxFooter.innerHTML = '&nbsp;'

  box.appendChild(boxHead)
  box.appendChild(boxBody)
  box.appendChild(boxFooter)

  return { box, boxBody }
}
