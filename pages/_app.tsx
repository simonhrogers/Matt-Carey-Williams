import { AppProps } from 'next/app'
import '@/styles/scss/main.scss'
import '@/styles/index.css'
import Script from 'next/script'
import { getCookie } from 'cookies-next'
import Footer from '@/components/global/Footer'
import Navbar from '@/components/global/Navbar'
import Consent from '@/components/global/Consent'
import ModalHandler from '@/components/global/ModalHandler'
import NewsletterBanner from '@/components/global/NewsletterBanner'
import SharedMenu from '@/components/shared/SharedMenu'
import { Suspense } from 'react'
import { Animate } from '@/components/shared/Animate'
import OriginTracker from "@/components/global/OriginTracker"

export interface SharedPageProps {
  token: string
}

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { token } = pageProps
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
          <ModalHandler />
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
            <>
              <Animate>
                <SharedMenu />
                <Component {...pageProps} />
              </Animate>
            </>
          </Suspense>
          <Suspense>
            <Footer />
          </Suspense>
          {/* <IntroTemplate /> */}
        </div>
      </OriginTracker>
    </>
  )
}
