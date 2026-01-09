/**
 * Helper for creating a DOM element with the HTML content for testing.
 *
 * @param html - HTML string to set as innerHTML
 * @returns A DOM element
 */
export const createElement = (html: string): HTMLDivElement => {
  const div = document.createElement('div')
  div.innerHTML = html

  return div
}
