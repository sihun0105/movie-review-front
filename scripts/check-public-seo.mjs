import assert from 'node:assert/strict'
import { htmlToDOM } from 'html-react-parser'

const [base = 'https://bollae.kr', articleId = '5', movieId = '20250654'] =
  process.argv.slice(2)
const origin = new URL(base).origin
const canonicalOrigin = 'https://bollae.kr'

function elements(nodes) {
  return nodes.flatMap((node) =>
    node.type === 'script' ? [] : [node, ...elements(node.children || [])],
  )
}
function textContent(node) {
  return node.data || (node.children || []).map(textContent).join('')
}
async function read(path) {
  const response = await fetch(`${origin}${path}`, {
    signal: AbortSignal.timeout(20000),
  })
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`)
  const nodes = elements(
    htmlToDOM(await response.text(), { xmlMode: path.includes('sitemap') }),
  )
  return nodes
}
function canonical(nodes, path) {
  const href = nodes.find(
    (n) => n.name === 'link' && n.attribs.rel === 'canonical',
  )?.attribs.href
  assert.equal(href, `${canonicalOrigin}${path}`, `${path}: canonical`)
  assert(
    !nodes.some(
      (n) =>
        n.name === 'meta' &&
        /^(robots|googlebot)$/.test(n.attribs.name) &&
        /noindex/.test(n.attribs.content),
    ),
    `${path}: unexpected noindex`,
  )
}
function link(nodes, href) {
  assert(
    nodes.some((n) => n.name === 'a' && n.attribs.href === href),
    `Missing HTML link: ${href}`,
  )
}

const articlePath = `/articles/${articleId}`
const article = await read(articlePath)
canonical(article, articlePath)
const heading = article.find((n) => n.name === 'h1')
assert(heading && textContent(heading).trim(), 'Article heading missing')
const listing = await read('/articles')
canonical(listing, '/articles')
link(listing, articlePath)
link(await read('/'), articlePath)

const moviePath = `/movie/${movieId}`
const movie = await read(moviePath)
canonical(movie, moviePath)
assert(
  movie.some((n) => n.name === 'h1' && textContent(n).trim()),
  'Movie heading missing',
)
assert(
  movie.some((n) => n.name === 'p' && textContent(n).trim().length > 30),
  'Movie plot missing',
)
canonical(await read('/chat/public'), '/chat/public')

const index = await read('/sitemap.xml')
const articleSitemaps = index
  .filter((n) => n.name === 'loc')
  .map(textContent)
  .filter((url) => url.includes('/sitemaps/articles/'))
let found = false
for (const url of articleSitemaps) {
  const nodes = await read(new URL(url).pathname)
  found ||= nodes.some(
    (n) =>
      n.name === 'loc' && textContent(n) === `${canonicalOrigin}${articlePath}`,
  )
}
assert(found, 'Article missing from sitemap')
const movies = await read('/sitemaps/movies.xml')
assert(
  !movies.some(
    (n) => n.name === 'lastmod' && textContent(n).startsWith('2000-01-01'),
  ),
  'Placeholder lastmod',
)
console.log(
  JSON.stringify(
    {
      result: 'PASS',
      origin,
      article: textContent(heading),
      checks: [
        'article HTML and canonical',
        'list and homepage links',
        'movie HTML and canonical',
        'public chat canonical',
        'article sitemap',
        'movie sitemap dates',
      ],
    },
    null,
    2,
  ),
)
