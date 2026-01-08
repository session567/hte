/**
 * Wrapper around chrome.storage.local API with simpler interface.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local}
 */
export const storage = {
  /**
   * Get one item from the storage area.
   *
   * @param key - Storage key
   * @returns The stored value, or undefined if not found
   */
  async get<T>(key: string): Promise<T | undefined> {
    const result = await chrome.storage.local.get(key)
    return result[key] as T
  },

  /**
   * Store one item in the storage area.
   *
   * @param key - Storage key
   * @param value - Value to store
   */
  async set(key: string, value: unknown): Promise<void> {
    await chrome.storage.local.set({ [key]: value })
  },

  /**
   * Remove an item from the storage area.
   *
   * @param key - Storage key
   */
  async remove(key: string): Promise<void> {
    await chrome.storage.local.remove(key)
  },
}
