'use client'

import { useGeolocation } from '@/hooks/use-geolocation'

export default function RecruitPage() {
  const { latitude, longitude, loading, error } = useGeolocation()

  return (
    <div className="mx-auto max-w-md p-6">
      {loading && <p>위치 정보를 불러오는 중...</p>}
      {error && <p className="text-red-500">오류: {error}</p>}
      {!loading && !error && (
        <div>
          <p>현재 위치:</p>
          <ul className="mb-4">
            <li>위도: {latitude}</li>
            <li>경도: {longitude}</li>
          </ul>
          {/* TODO: 위치 기반 영화관 리스트 및 동행 모집 UI 추가 */}
        </div>
      )}
    </div>
  )
}
