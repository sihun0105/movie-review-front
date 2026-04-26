/*
 * 영화 id 로부터 oklch 팔레트 산출.
 * 디자인이 영화별로 hue 를 다르게 두는데 백엔드는 제공하지 않음 → id 해시로 결정.
 */

export interface PosterPalette {
  h: number // hue 0–360
  c: number // chroma 0–0.4
  lt: number // top L 0–1
  lb: number // bottom L 0–1
}

const FALLBACK: PosterPalette = { h: 18, c: 0.1, lt: 0.32, lb: 0.1 }

const FIXED_HUES: Record<string, number> = {
  파묘: 18,
  듄: 65,
  거미집: 85,
  비공식작전: 220,
  밀수: 200,
  슬램덩크: 25,
}

function hash32(input: string | number): number {
  const str = String(input)
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function paletteForMovie(
  movieId: string | number,
  title?: string,
): PosterPalette {
  if (title) {
    const matchKey = Object.keys(FIXED_HUES).find((k) => title.includes(k))
    if (matchKey) {
      return { ...FALLBACK, h: FIXED_HUES[matchKey] }
    }
  }
  const h = hash32(movieId) % 360
  const c = 0.08 + (hash32(`c-${movieId}`) % 700) / 10000
  return { ...FALLBACK, h, c }
}
