export function generateRandomNumber(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}
