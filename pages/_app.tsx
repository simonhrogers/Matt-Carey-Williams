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

import smartquotes from 'smartquotes'
smartquotes.replacements.push([/([0-9])-([0-9])/g, '$1–––––$2']) // hyphen to en-dash between numbers
smartquotes.replacements.push([/(\s)-(\s)/g, '$1–$2']) // hyphen to en-dash between spaces
smartquotes.replacements.push([/(.)-(\d)/g, '$1–$2']) // hyphen to en-dash between character and digit
smartquotes.replacements.push([/(\d)-(.)/g, '$1–$2']) // hyphen to en-dash between digit and character
smartquotes.replacements.push([/\s–\s/g, '–']) // space removed around en-dash
smartquotes.replacements.push([/([0-9])x(\s)/g, '$1×$2']) // x to × after digit with following space
smartquotes.replacements.push([/(\s)x([0-9])/g, '$1×$2']) // x to × before digit with preceeding space
smartquotes.replacements.push([/([0-9])X(\s)/g, '$1×$2']) // X to × after digit with following space
smartquotes.replacements.push([/(\s)X([0-9])/g, '$1×$2']) // X to × before digit with preceeding space
smartquotes.replacements.push([/(\s)x(\s)/g, '$1×$2']) // x to × between spaces
smartquotes.replacements.push([/(\s)X(\s)/g, '$1×$2']) // X to × between spaces
smartquotes.replacements.push([/(\d)cm/g, '$1 cm']) // space after digit and cm
smartquotes.replacements.push([/(\d)CM/g, '$1 cm']) // space after digit and cm
smartquotes.replacements.push([/(\d)mm/g, '$1 mm']) // space after digit and mm
smartquotes.replacements.push([/(\d)MM/g, '$1 mm']) // space after digit and mm
smartquotes.replacements.push([/(CO2)/g, 'CO₂'])

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
          <div className="banners">
            <NewsletterBanner />
            <Consent />
          </div>
          <Navbar />
          <Animate>
            {/* <SharedMenu /> */}
            <Component {...pageProps} />
          </Animate>
          <Footer />
        </div>
      </OriginTracker>
    </>
  )
}
