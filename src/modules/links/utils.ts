import { isNil } from '@common/utils/predicates'
import { ALLOWED_PLACEHOLDERS } from '@modules/links/constants'

// Matches placeholders like {teamId}
const REGEX_PLACEHOLDERS = /\{(\w+)}/g

/**
 * Replace placeholders in a string with actual values.
 *
 * Placeholders are enclosed in curly braces (e.g. `{teamId}`).
 *
 * @param template - string containing placeholders
 * @param data - Object mapping placeholder names to their values
 * @returns string with placeholders replaced
 * @throws {@link Error} if placeholder is invalid or data is missing
 */
export const replacePlaceholders = (template: string, data: Record<string, string | null>): string => {
  return template.replace(REGEX_PLACEHOLDERS, (_match, placeholder: string) => {
    if (!ALLOWED_PLACEHOLDERS.includes(placeholder)) {
      throw new Error(`Invalid placeholder {${placeholder}} in ${template}`)
    }

    const value = data[placeholder]
    if (isNil(value)) throw new Error(`Missing data for placeholder {${placeholder}}`)

    return value
  })
}
