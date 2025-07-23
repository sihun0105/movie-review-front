import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://drunkenmovie.shop',
      lastModified: new Date(),
    },
    {
      url: 'https://drunkenmovie.shop/account',
      lastModified: new Date(),
    },
    {
      url: 'https://drunkenmovie.shop/recruit',
      lastModified: new Date(),
    },
    // 영화 관련 페이지들 추가
    {
      url: 'https://drunkenmovie.shop/movies',
      lastModified: new Date(),
    },
    {
      url: 'https://drunkenmovie.shop/reviews',
      lastModified: new Date(),
    },
  ]
}
