import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/site-config'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${siteConfig.legalName} | Luxury Interior Designers in Noida & Delhi NCR`,
  description: siteConfig.description,
  keywords:
    'interior designer noida, interior design greater noida, 3D interior design, 3BHK interior, 4BHK interior, modular kitchen, luxury villa interior, office interior, G&Y interiors, green and young',
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${siteConfig.legalName} | Luxury Turnkey Interiors`,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.legalName,
  },
  icons: {
    icon: [
      { url: '/images/logo/Tab_logo.png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/images/logo/Tab_logo.png',
    apple: '/images/logo/Tab_logo.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.legalName} | Luxury Turnkey Interiors`,
    description: siteConfig.description,
    images: [siteConfig.assets.ogImage],
  },
}

import { SessionProvider } from '@/components/session-provider'
import Script from 'next/script'
import { AnalyticsTracker } from '@/components/analytics-tracker'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || siteConfig.analytics.gtmId

  return (
    <html lang="en" className={`${geistSans.variable} bg-background`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager Container Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": siteConfig.legalName,
              "image": `${siteConfig.url}${siteConfig.assets.ogImage}`,
              "url": siteConfig.url,
              "telephone": siteConfig.phone.primary,
              "priceRange": "₹₹₹",
              "sameAs": [
                siteConfig.social.instagram,
                siteConfig.social.facebook
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": `${siteConfig.address.building}, ${siteConfig.address.area}`,
                "addressLocality": siteConfig.address.city,
                "addressRegion": siteConfig.address.state,
                "postalCode": siteConfig.address.postalCode,
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.6280,
                "longitude": 77.3649
              },
              "areaServed": siteConfig.address.serviceAreas,
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": `${siteConfig.legalName} Interior Services`,
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Modular Kitchen & Wardrobe Execution",
                      "description": "Ergonomic, moisture-resistant modular kitchens with German hardware."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Luxury Residential Turnkey Interiors",
                      "description": "Complete 3 BHK, 4 BHK, Villa interior designing, false ceiling & 3D measurements."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Commercial & Corporate Office Interiors",
                      "description": "Executive cabins, conference rooms, and collaborative workspaces."
                    }
                  }
                ]
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "10:00",
                "closes": "20:00"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SessionProvider>
          <AnalyticsTracker />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </SessionProvider>
      </body>
    </html>
  )
}
