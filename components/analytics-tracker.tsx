'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function TrackerContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page_view events when route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowObject = window as any
      windowObject.dataLayer = windowObject.dataLayer || []
      
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      windowObject.dataLayer.push({
        event: 'page_view',
        page_path: url
      })
    }
  }, [pathname, searchParams])

  // Track global call and WhatsApp link clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''

      // Call click tracking
      if (href.startsWith('tel:')) {
        const windowObject = window as any
        windowObject.dataLayer = windowObject.dataLayer || []
        windowObject.dataLayer.push({
          event: 'call_click',
          phone_number: href.replace('tel:', '')
        })
      } 
      // WhatsApp click tracking
      else if (
        href.includes('wa.me') || 
        href.includes('api.whatsapp.com') || 
        href.includes('whatsapp.com')
      ) {
        const windowObject = window as any
        windowObject.dataLayer = windowObject.dataLayer || []
        windowObject.dataLayer.push({
          event: 'whatsapp_click',
          whatsapp_url: href
        })
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [])

  return null
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerContent />
    </Suspense>
  )
}
