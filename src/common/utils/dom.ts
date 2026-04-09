/**
 * Creates an HTML element with the given tag, properties, and dataset.
 */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> & { dataset?: Record<string, string> } = {},
): HTMLElementTagNameMap[K] {
  const { dataset, ...rest } = props
  const element = Object.assign(document.createElement(tag), rest)

  if (dataset) Object.assign(element.dataset, dataset)

  return element
}
