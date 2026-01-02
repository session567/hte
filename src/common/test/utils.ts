export const createNode = (html: string): ParentNode => {
  const div = document.createElement('div')
  div.innerHTML = html

  return div
}
