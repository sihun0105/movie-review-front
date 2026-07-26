# Sitemap Index Design

## Goal

Remove the latest-50-content limit from `sitemap.xml` and expose every public
article and match through paginated child sitemaps.

## Architecture

- `https://bollae.kr/sitemap.xml` becomes a sitemap index.
- Static pages and the current movie collection each use one child sitemap.
- Articles and matches use page-based child sitemaps with 100 URLs per page.
- The index follows each public list API's `hasNext` value to discover every
  available page without requiring a new backend count endpoint.
- Each child route fetches only its own page and returns canonical absolute
  URLs with the content's real `updatedAt` value.

## Routes

| Route | Responsibility |
| --- | --- |
| `/sitemap.xml` | List all child sitemap URLs |
| `/sitemaps/static.xml` | Public static routes |
| `/sitemaps/movies.xml` | Current public movie detail routes |
| `/sitemaps/articles/:page` | One page of article detail routes |
| `/sitemaps/matches/:page` | One page of match detail routes |

XML responses do not require an `.xml` suffix, so dynamic page routes use a
plain numeric final segment.

## Failure Handling

- Article and match page discovery fail independently.
- A failed source is omitted from the index while healthy sources remain
  available.
- Invalid or non-positive page parameters return HTTP 404.
- Empty child sitemap pages return a valid empty sitemap.

## Testing

- Verify page discovery continues beyond the former first page limit.
- Verify discovery stops when `hasNext` becomes false.
- Verify article, match, movie, and static URL field mapping.
- Verify the sitemap index contains every discovered child page.
- Run the full test suite, lint, production build, and 200-line checks.
