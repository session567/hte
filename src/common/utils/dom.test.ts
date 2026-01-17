import {
  getElementById,
  getElementsByName,
  querySelector,
  querySelectorAll,
  querySelectorAllIn,
  querySelectorIn,
} from '@common/utils/dom'
import { logger } from '@common/utils/logger'
import { beforeEach, describe, expect, it } from 'vitest'

describe(getElementById, () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test-element">Test</div>'
  })

  it('returns element when found', () => {
    const element = getElementById('test-element')

    expect(element?.textContent).toBe('Test')
    expect(logger.warn).not.toHaveBeenCalled()
  })

  it('returns null and warns when element not found', () => {
    const element = getElementById('nonexistent')

    expect(element).toBeNull()
    expect(logger.warn).toHaveBeenCalledWith('getElementById: nonexistent not found')
  })

  it('returns null without warning when warn is false', () => {
    const element = getElementById('nonexistent', false)

    expect(element).toBeNull()
    expect(logger.warn).not.toHaveBeenCalled()
  })
})

describe(getElementsByName, () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input name="test-input" value="1">
      <input name="test-input" value="2">
      <input name="other" value="3">
    `
  })

  it('returns elements when found', () => {
    const elements = getElementsByName('test-input')

    expect(elements).toHaveLength(2)
    expect(logger.warn).not.toHaveBeenCalled()
  })

  it('returns empty list and warns when no elements found', () => {
    const elements = getElementsByName('nonexistent')

    expect(elements).toHaveLength(0)
    expect(logger.warn).toHaveBeenCalledWith('getElementsByName: nonexistent not found')
  })

  it('returns empty list without warning when warn is false', () => {
    const elements = getElementsByName('nonexistent', false)

    expect(elements).toHaveLength(0)
    expect(logger.warn).not.toHaveBeenCalled()
  })
})

describe(querySelector, () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="target">Found</span>
      </div>
    `
  })

  it('returns element when found', () => {
    const element = querySelector('.target')

    expect(element?.textContent).toBe('Found')
    expect(logger.warn).not.toHaveBeenCalled()
  })

  it('returns null and warns when element not found', () => {
    const element = querySelector('.nonexistent')

    expect(element).toBeNull()
    expect(logger.warn).toHaveBeenCalledWith('querySelector: .nonexistent not found')
  })

  it('returns null without warning when warn is false', () => {
    const element = querySelector('.nonexistent', false)

    expect(element).toBeNull()
    expect(logger.warn).not.toHaveBeenCalled()
  })
})

describe(querySelectorIn, () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <span class="target">Found</span>
      </div>
      <div class="other">
        <span class="target">Other</span>
      </div>
    `
  })

  it('returns element within root', () => {
    const root = document.querySelector('.container')!
    const element = querySelectorIn(root, '.target')

    expect(element?.textContent).toBe('Found')
    expect(logger.warn).not.toHaveBeenCalled()
  })

  it('returns null and warns when element not found in root', () => {
    const root = document.querySelector('.container')!
    const element = querySelectorIn(root, '.nonexistent')

    expect(element).toBeNull()
    expect(logger.warn).toHaveBeenCalledWith('querySelector: .nonexistent not found')
  })

  it('returns null without warning when warn is false', () => {
    const root = document.querySelector('.container')!
    const element = querySelectorIn(root, '.nonexistent', false)

    expect(element).toBeNull()
    expect(logger.warn).not.toHaveBeenCalled()
  })

  it('scopes search to specific root', () => {
    const root = document.querySelector('.container')!
    const element = querySelectorIn(root, '.target')

    expect(element?.textContent).toBe('Found')
  })
})

describe(querySelectorAll, () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="other">Other</div>
    `
  })

  it('returns elements when found', () => {
    const elements = querySelectorAll('.item')

    expect(elements).toHaveLength(2)
    expect(elements[0].textContent).toBe('Item 1')
    expect(elements[1].textContent).toBe('Item 2')
    expect(logger.warn).not.toHaveBeenCalled()
  })

  it('returns empty list and warns when no elements found', () => {
    const elements = querySelectorAll('.nonexistent')

    expect(elements).toHaveLength(0)
    expect(logger.warn).toHaveBeenCalledWith('querySelectorAll: .nonexistent not found')
  })

  it('returns empty list without warning when warn is false', () => {
    const elements = querySelectorAll('.nonexistent', false)

    expect(elements).toHaveLength(0)
    expect(logger.warn).not.toHaveBeenCalled()
  })
})

describe(querySelectorAllIn, () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
      </div>
      <div class="other">
        <div class="item">Item 3</div>
      </div>
    `
  })

  it('returns elements within root', () => {
    const root = document.querySelector('.container')!
    const elements = querySelectorAllIn(root, '.item')

    expect(elements).toHaveLength(2)
    expect(elements[0].textContent).toBe('Item 1')
    expect(elements[1].textContent).toBe('Item 2')
    expect(logger.warn).not.toHaveBeenCalled()
  })

  it('returns empty list and warns when no elements found in root', () => {
    const root = document.querySelector('.container')!
    const elements = querySelectorAllIn(root, '.nonexistent')

    expect(elements).toHaveLength(0)
    expect(logger.warn).toHaveBeenCalledWith('querySelectorAll: .nonexistent not found')
  })

  it('returns empty list without warning when warn is false', () => {
    const root = document.querySelector('.container')!
    const elements = querySelectorAllIn(root, '.nonexistent', false)

    expect(elements).toHaveLength(0)
    expect(logger.warn).not.toHaveBeenCalled()
  })
})
