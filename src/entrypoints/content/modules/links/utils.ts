import { isNil } from '@/entrypoints/content/common/utils/predicates'

// Matches placeholders like {teamId}
const REGEX_PLACEHOLDERS = /\{(\w+)}/g

/**
 * Replace placeholders in a string with actual values.
 *
 * Placeholders are enclosed in curly braces (e.g. `{teamId}`).
 *
 * @param template - string containing placeholders
 * @param replacements - Object mapping placeholder names to their values
 * @returns string with placeholders replaced
 * @throws {@link Error} if placeholder is invalid or replacements is missing
 */
export const replacePlaceholders = (template: string, replacements: Record<string, string | null>): string => {
  return template.replace(REGEX_PLACEHOLDERS, (_match, placeholder: string) => {
    const value = replacements[placeholder]
    if (isNil(value)) throw new Error(`Missing data for placeholder {${placeholder}}`)

    return value
  })
}
