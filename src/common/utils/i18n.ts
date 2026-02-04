import browser from 'webextension-polyfill'

/**
 * Get the localized string from chrome.i18n API.
 *
 * @param key - Message key from messages.json
 * @param substitutions - Optional placeholder substitutions
 * @returns Translated string
 */
export const t = (key: string, substitutions?: string | string[]): string => {
  return browser.i18n.getMessage(key, substitutions) || key
}
