export function articlePageNumber(value?: string): number {
  if (!value || !/^[1-9]\d*$/.test(value)) return 1
  const page = Number(value)
  return Number.isSafeInteger(page) ? page : 1
}

export function articlePageHref(page: number): string {
  return page === 1 ? '/articles' : `/articles?page=${page}`
}

// Imported legacy records use this sentinel rather than a real modification date.
export function sitemapModifiedDate(value?: string): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  const iso = date.toISOString()
  return iso.startsWith('2000-01-01') ? undefined : iso
}
