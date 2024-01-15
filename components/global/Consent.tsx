'use client'

import { useEffect, useState } from 'react'
import { hasCookie,setCookie } from 'cookies-next'
// import { Settings } from 'sanity/lib/sanity.queries'
import Link from 'next/link'

import styles from './Consent.module.scss'


// export interface ConsentProps {
//   settings: Settings
// }

export default function Consent() {

  // const { settings } = props

  const [consent, setConsent] = useState(true)
  useEffect(() => {
    setConsent(hasCookie('localConsent'))
  }, [])

  const acceptCookie = () => {
    setConsent(true)
    setCookie('localConsent', 'true', { maxAge: 60 * 60 * 24 * 365 })
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    })
  }
  
  const close = () => {
    setConsent(true)
  }

  const denyCookie = () => {
    setConsent(true)
    setCookie('localConsent', 'false', { maxAge: 60 * 60 * 24 * 365 })
  }

  if (consent === true) {
    return null
  }
  
  return (
    <div className="banner">
      <div className="banner-text">
        This website uses cookies to ensure you have the best experience. Read our <Link href="privacy-policy">privacy policy</Link>.
      </div>
      <div className="banner-options">
        <button
          className="banner-option"
          onClick={() => {
            acceptCookie()
          }}
        >
          Accept
        </button>
        <button className="banner-option" onClick={(e) => denyCookie()}>
          Reject
        </button>
        {/* <button
          className={styles.consentOption}
          onClick={(e) => {
            close()
          }}
        >
          Close
        </button> */}
      </div>
    </div>
  )
}
