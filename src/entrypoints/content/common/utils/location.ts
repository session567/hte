/**
 * Get the current page's pathname from the browser location.
 *
 * @returns The pathname (e.g., '/Club/Players/')
 */
export const getCurrentPathname = (): string => window.location.pathname

/**
 * Get the current page's search params from the browser location.
 *
 * @returns The URLSearchParams (e.g., '?YouthTeamId=123')
 */
export const getCurrentSearchParams = (): URLSearchParams => new URLSearchParams(window.location.search)
