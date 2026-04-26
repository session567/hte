type TeamContext = 'OWN_TEAM' | 'OTHER_TEAM'

type QueryParam = {
  name: string
  value?: string
}

export type PageOptions = {
  teamContext?: TeamContext
  queryParams?: QueryParam[]
}

export type PageTree = Page | { [key: string]: PageTree }

/**
 * Represents a specific page on Hattrick.
 *
 * Used to determine which modules should run on the current page.
 */
export class Page {
  /**
   * Special pathname value indicating a module should run on all pages.
   */
  static readonly __ALL__ = '__ALL__'

  /**
   * @param pathname - The URL pathname of the Hattrick page (e.g., '/Club/Players/')
   * @param options - Optional settings to distinguish pages with the same pathname
   */
  constructor(
    public readonly pathname: string,
    public readonly options?: PageOptions,
  ) {}

  toString() {
    return this.options ? `Page("${this.pathname}", ${JSON.stringify(this.options)})` : `Page("${this.pathname}")`
  }
}
