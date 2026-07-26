# Article Detail SEO Design

## Goal

Make every public article detail page independently indexable and understandable
by search engines instead of inheriting the home page metadata.

## Current Problem

`/articles/[id]` renders the article body on the server, but it inherits the root
title, description, Open Graph URL, and home-page canonical URL. The sitemap and
robots rules already expose article detail URLs, so the incorrect canonical and
generic metadata are the primary defects.

## Design

- Add pure article SEO builders beside the article detail page.
- Generate a title from the article title and a plain-text description from the
  Markdown body.
- Use `https://bollae.kr/articles/{id}` as the canonical and Open Graph URL.
- Emit index/follow directives and `article` Open Graph metadata with published
  and modified timestamps.
- Use the first Markdown image as the social preview when present; otherwise use
  the existing site Open Graph image.
- Emit `BlogPosting` JSON-LD with headline, description, author, dates, URL, and
  image, plus a `BreadcrumbList`.
- Escape `<` in serialized JSON-LD before placing it in a script element.
- Reuse one cached server-side article lookup across metadata generation and page
  rendering to avoid duplicate backend requests within a render.

## Error Handling

- Missing articles continue to resolve through the existing `notFound()` path.
- Metadata generation falls back to a generic article title and description only
  when article lookup fails.
- Empty Markdown content produces a short generic community description.

## Testing

- Unit-test Markdown-to-description conversion, self-referencing canonical,
  article Open Graph metadata, first-image extraction, and JSON-LD fields.
- Verify the tests fail before implementation.
- Run focused Vitest tests, lint, production build, and the 200-line limit check.
- After deployment, inspect `/articles/5` HTML for its title, canonical, Open
  Graph URL, description, and `BlogPosting` JSON-LD.

## Deployment

The remote repository currently has no `develop` branch, so use the established
feature-to-`master` PR flow and verify the production GitHub Actions run.
