'use client'

import { usePathname } from "next/navigation"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

export function NewsletterBanner() {

  const [closed, setClosed] = useState<string | null>('true')
  const [keys, setKeys] = useState<string[]>([])
  const [length, setLength] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      console.log('sessionStorage.getItem("closed")', sessionStorage.getItem('closed'))
      let closed = sessionStorage.getItem('closed')
      let keys: string[] = []
      for (let i = 0; i < sessionStorage.length; i++) {
        keys.push(sessionStorage.key(i)!)
      }
      setClosed(closed)
      setKeys(keys)
      setLength(sessionStorage.length)
    }
  }, [])

  function handleSave(value) {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("closed", value)
      let closed = sessionStorage.getItem("closed")
      let keys: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        keys.push(sessionStorage.key(i)!);
      }
      setClosed(closed)
      setKeys(keys);
      setLength(sessionStorage.length);
    }
  }

  // function handleRemove() {
  //   if (typeof window !== 'undefined' && window.sessionStorage) {
  //     sessionStorage.removeItem('closed')
  //     setClosed("false");
  //   }
  // }

  // function handleClear() {
  //   if (typeof window !== 'undefined' && window.sessionStorage) {
  //     sessionStorage.clear()
  //     setClosed("false")
  //   }
  // }

  const pathname = usePathname()
  const router = useRouter()

  const close = () => {
    // setClosed(false)
    // sessionStorage.setItem('newsletterBanner', 'false')
    // console.log('sessionStorage.getItem("newsletterBanner")', sessionStorage.getItem('newsletterBanner'));
    handleSave('true')
  }

  const closedModal = () => {
    router.push(`${pathname}?modal=newsletter`, undefined, { shallow: true })
    close()
  }

  return (!closed || closed === 'false') ? (
    <div className="banner">
      <div className="banner-text">
        Subscribe to our newsletter to get our latest updates on upcoming exhibitions, events and more.
      </div>
      <div className="banner-options">
        <button
          className="banner-option"
          onClick={(e) => {
            closedModal()
          }}
        >
          Subscribe
        </button>
        <button
          className="banner-option"
          onClick={(e) => {
            close()
          }}
        >
          Close
        </button>
      </div>
    </div>
  ) : null
}

export default NewsletterBanner