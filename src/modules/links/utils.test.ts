import { replacePlaceholders } from '@modules/links/utils'
import { describe, expect, it } from 'vitest'

describe(replacePlaceholders, () => {
  it('replaces valid placeholders with data', () => {
    const url = 'https://example.com/team/{teamId}/series/{seriesId}'
    const data = { teamId: '123', seriesId: '456' }

    expect(replacePlaceholders(url, data)).toBe('https://example.com/team/123/series/456')
  })

  it('handles multiple occurrences of same placeholder', () => {
    const url = 'https://example.com/{teamId}/info/{teamId}'
    const data = { teamId: '123', seriesId: '456' }

    expect(replacePlaceholders(url, data)).toBe('https://example.com/123/info/123')
  })

  it('returns url unchanged if no placeholders', () => {
    const url = 'https://example.com/team'
    const data = { teamId: '123', seriesId: '456' }

    expect(replacePlaceholders(url, data)).toBe(url)
  })

  it('throws error for invalid placeholder', () => {
    const url = 'https://example.com/user/{userId}'
    const data = { teamId: '123', seriesId: '456' }

    expect(() => replacePlaceholders(url, data)).toThrowError(
      'Invalid placeholder {userId} in https://example.com/user/{userId}',
    )
  })

  it('throws error when data is null', () => {
    const url = 'https://example.com/team/{teamId}'
    const data = { teamId: null, seriesId: '456' }

    expect(() => replacePlaceholders(url, data)).toThrowError('Missing data for placeholder {teamId}')
  })

  it('throws error when data is missing a key', () => {
    const url = 'https://example.com/team/{teamId}'
    const data = { seriesId: '456' }

    expect(() => replacePlaceholders(url, data)).toThrowError('Missing data for placeholder {teamId}')
  })
})
