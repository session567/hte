/**
 * Get translated message from chrome.i18n API.
 *
 * @param key - Message key from messages.json
 * @param substitutions - Optional placeholder substitutions
 * @returns Translated string
 */
export const t = (key: string, substitutions?: string | string[]): string => {
  return chrome.i18n.getMessage(key, substitutions) || key
}
