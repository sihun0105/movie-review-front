'use client'

import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { ArticleRepliesResponse } from '@/lib/type'
import { useParams } from 'next/navigation'
import useSWRInfinite from 'swr/infinite'

/** 댓글 목록 key */
const getKey =
  (articleId: number) =>
  (pageIndex: number, previousPageData: ArticleRepliesResponse | null) => {
    if (previousPageData && !previousPageData.hasNext) return null
    return AppClientApiEndpoint.getArticleComments(articleId, pageIndex)
  }

const fetcher = async (url: string): Promise<ArticleRepliesResponse> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('댓글을 불러오지 못했습니다.')
  const result = await res.json()
  return result.data
}

export const useArticleComments = () => {
  const params = useParams()
  const articleId = params?.id

  if (!articleId) {
    throw new Error('articleId is required')
  }

  const { data, setSize, mutate, error, isLoading, isValidating } =
    useSWRInfinite<ArticleRepliesResponse>(getKey(+articleId), fetcher)
  const hasMore =
    Array.isArray(data) && data.length > 0
      ? data[data.length - 1].hasNext
      : false

  const next = () => setSize((size) => size + 1)

  return {
    data,
    next,
    error,
    isLoading,
    isValidating,
    hasMore,
    mutate,
  }
}
