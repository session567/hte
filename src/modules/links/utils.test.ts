import { replacePlaceholders } from '@modules/links/utils'

describe('replacePlaceholders', () => {
  it('should replace valid placeholders with data', () => {
    const url = 'https://example.com/team/{teamId}/series/{seriesId}'
    const data = { teamId: '123', seriesId: '456' }

    const result = replacePlaceholders(url, data)

    expect(result).toBe('https://example.com/team/123/series/456')
  })

  it('should handle multiple occurrences of same placeholder', () => {
    const url = 'https://example.com/{teamId}/info/{teamId}'
    const data = { teamId: '123', seriesId: '456' }

    const result = replacePlaceholders(url, data)

    expect(result).toBe('https://example.com/123/info/123')
  })

  it('should return url unchanged if no placeholders', () => {
    const url = 'https://example.com/team'
    const data = { teamId: '123', seriesId: '456' }

    const result = replacePlaceholders(url, data)

    expect(result).toBe('https://example.com/team')
  })

  it('should throw error for invalid placeholder', () => {
    const url = 'https://example.com/user/{userId}'
    const data = { teamId: '123', seriesId: '456' }

    expect(() => replacePlaceholders(url, data)).toThrow(
      'Invalid placeholder {userId} in https://example.com/user/{userId}',
    )
  })

  it('should throw error when data is null', () => {
    const url = 'https://example.com/team/{teamId}'
    const data = { teamId: null, seriesId: '456' }

    expect(() => replacePlaceholders(url, data)).toThrow('Missing data for placeholder {teamId}')
  })

  it('should throw error when data is missing a key', () => {
    const url = 'https://example.com/team/{teamId}'
    const data = { seriesId: '456' } as Record<string, string | null>

    expect(() => replacePlaceholders(url, data)).toThrow('Missing data for placeholder {teamId}')
  })
})
