import { isNil } from '@common/utils/predicates'
import { ALLOWED_PLACEHOLDERS } from '@modules/links/constants'

const REGEX_PLACEHOLDERS = /\{(\w+)}/g

export const replacePlaceholders = (url: string, data: Record<string, string | null>): string => {
  return url.replace(REGEX_PLACEHOLDERS, (_match, placeholder: string) => {
    if (!ALLOWED_PLACEHOLDERS.includes(placeholder)) {
      throw new Error(`Invalid placeholder {${placeholder}} in link ${url}`)
    }

    const value = data[placeholder]
    if (isNil(value)) throw new Error(`Missing data for placeholder {${placeholder}}`)

    return value
  })
}
