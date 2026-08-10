# Movie cast cards

## Goal

Show the leading cast on movie detail pages with a face, name, and role while
keeping repeat requests fast and resilient to external API failures.

## Data

- Store up to eight TMDB cast members per movie in a MovieActor table.
- Persist TMDB person id, Korean display name, character, profile URL, and order.
- Include actors in the existing movie detail gRPC and REST response.
- On a cache miss, fetch credits once through the movie service, persist them,
  and return the resulting cast. External failures return an empty cast.

## UI

- Place a cast section after the synopsis and before director filmography.
- Render portrait cards in a contained horizontal scroller.
- Each card shows a 2:3 face crop, actor name, and character when available.
- Hide the section when no valid actors exist; use neutral skeletons while loading.

## Reliability

- Keep TMDB credentials server-only.
- Never fail the movie detail request solely because cast enrichment failed.
- Limit the response and rendered cards to eight.

## Verification

- Backend tests cover TMDB mapping, persistence ordering, cache hits, and failure fallback.
- Frontend tests cover response mapping, section visibility, labels, and overflow containment.
- Type checks, lint, builds, 200-line limits, and responsive screenshots pass.
