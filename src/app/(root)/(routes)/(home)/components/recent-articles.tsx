import { ArticleRepository } from '@/modules/article/article-repository'
import Link from 'next/link'

export async function RecentArticles() {
  const result = await new ArticleRepository()
    .listArticles(1, 5)
    .catch(() => null)
  if (!result?.articles.length) return null

  return (
    <section className="mt-6 border-t border-border">
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="text-base font-semibold">커뮤니티 최신 글</h2>
        <Link href="/articles" className="text-xs text-muted-foreground">
          전체 보기
        </Link>
      </div>
      {result.articles.map((article) => (
        <Link
          key={article.id}
          href={`/articles/${article.id}`}
          className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 hover:bg-secondary"
        >
          <span className="min-w-0 text-sm font-medium">{article.title}</span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {article.author}
          </span>
        </Link>
      ))}
    </section>
  )
}
