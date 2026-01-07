import { isNil } from '@common/utils/predicates'
import { ALLOWED_PLACEHOLDERS } from '@modules/links/constants'

const PLACEHOLDERS_REGEX = /\{(\w+)}/g

export const replacePlaceholders = (url: string, data: Record<string, string | null>): string => {
  return url.replace(PLACEHOLDERS_REGEX, (_match, placeholder: string) => {
    if (!ALLOWED_PLACEHOLDERS.includes(placeholder)) {
      throw new Error(`Invalid placeholder {${placeholder}} in link ${url}`)
    }

    const value = data[placeholder]
    if (isNil(value)) throw new Error(`Missing data for placeholder {${placeholder}}`)

    return value
  })
}
