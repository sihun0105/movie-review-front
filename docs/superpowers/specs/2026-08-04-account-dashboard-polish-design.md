# Account dashboard polish

## Goal

Make `/account` feel like a film profile rather than a settings form, while fixing
missing movie comments, broken rating posters, and unclear received-like counts.

## Layout

- Mobile: profile header, one-line activity tabs, selected activity feed, account actions.
- Desktop: narrow profile/account rail and a wider activity feed.
- Activity tabs use icons, counts, and an underline instead of boxed 2x2 cards or a filled black state.
- The selected feed has a clear title and total count. Rows use film posters where relevant and compact metadata.

## Data

- `comments` combines movie `Comment` and `articleComments`, newest first.
- Each comment carries its target type, target id, and target title so navigation and deletion use the correct endpoint.
- The summary comment count includes both sources.
- Received-like rows surface the like count as a dedicated badge.

## Reliability

- Rating posters reuse the app's poster renderer, avoiding host restrictions from direct `next/image` usage.
- Existing authentication and soft-delete behavior remain unchanged.
- Empty, loading, retry, pagination, and delete-confirmation states remain available.

## Verification

- Backend tests cover merged ordering, pagination, and combined count.
- Frontend tests cover target routing, delete endpoint selection, prominent likes, and the responsive dashboard structure.
- Validate mobile and desktop screenshots without page-level horizontal scrolling.
