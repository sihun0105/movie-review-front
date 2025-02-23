'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

const GoogleAd = () => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7192194847972682"
      data-ad-slot="5979674316"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}

export default GoogleAd
