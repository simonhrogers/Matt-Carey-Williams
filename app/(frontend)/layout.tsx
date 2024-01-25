import '@/styles/index.css'

import { toPlainText } from '@portabletext/react'
import { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import { getCookie } from 'cookies-next'

import { Footer } from '@/components/global/Footer'
import { Navbar } from '@/components/global/Navbar'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'

import "@/styles/scss/main.scss"
import Script from 'next/script'
import Consent from '@/components/global/Consent'
import ModalHandler from '@/components/global/ModalHandler'
import NewsletterBanner from '@/components/global/NewsletterBanner'
import SharedMenu from '@/components/shared/SharedMenu'
import OriginTracker from '@/components/global/OriginTracker'
import PageAnimatePresence from '@/components/shared/PageAnimatePresence'
import { Animate } from '@/components/shared/Animate'

const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'))

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ])

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Personal website',
        }
      : undefined,
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {

  const consent = getCookie('localConsent')

  return (
    <>
      {/* init gtag analytics */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-463X2E2R4R"/>
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });

            gtag('js', new Date());
            gtag('config', 'G-RTD9NJDZE1');
          `,
        }}
      />
      {/* if consent is provided, confirm on each route change */}
      {consent === true && (
        <Script
          id="consent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted'
            });
          `,
          }}
        />
      )}
      <OriginTracker>
        <div className="layout">
          <Suspense>
            <ModalHandler />
          </Suspense>
          <Suspense>
            <div className="banners">
              <NewsletterBanner />
              <Consent />
            </div>
          </Suspense>
          <Suspense>
            <Navbar />
          </Suspense>
          <Suspense>
            {/* <PageAnimatePresence> */}
              <>
                <SharedMenu />
                {children}
                {/* <Animate>{children}</Animate> */}
              </>
            {/* </PageAnimatePresence> */}
          </Suspense>
          <Suspense>
            <Footer />
          </Suspense>
          {/* <IntroTemplate /> */}
        </div>
      </OriginTracker>
      {draftMode().isEnabled && <VisualEditing />}
    </>
  )
}
