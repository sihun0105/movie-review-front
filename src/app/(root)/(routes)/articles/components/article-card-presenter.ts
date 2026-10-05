const RECENT_WINDOW_MS = 48 * 60 * 60 * 1000

export function articlePreview(content: string, maxLength = 120): string {
  const plainText = content
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return Array.from(plainText).slice(0, maxLength).join('')
}

export function isRecentArticle(
  createdAt: string,
  now = new Date(),
): boolean {
  const createdTime = new Date(createdAt).getTime()
  const age = now.getTime() - createdTime
  return Number.isFinite(createdTime) && age >= 0 && age < RECENT_WINDOW_MS
}
