export function insertMarkdownText(
  current: string,
  text: string,
  start: number,
  end: number,
) {
  return {
    value: `${current.slice(0, start)}${text}${current.slice(end)}`,
    cursor: start + text.length,
  }
}
