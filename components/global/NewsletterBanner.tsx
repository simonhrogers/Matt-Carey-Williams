'use client'

import { set } from "date-fns"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export function NewsletterBanner() {

  const [open, setOpen] = useState(true)

  const pathname = usePathname()

  const close = () => {
    setOpen(false)
  }

  const openModal = () => {
    window.history.pushState({}, '', new URL(window.location.origin + `${pathname}?modal=newsletter`))
    setOpen(false)
  }

  return open ? (
    <div className="banner">
      <div className="banner-text">
        Subscribe to our newsletter to get our latest updates on upcoming exhibitions, events and more.
      </div>
      <div className="banner-options">
        <button
          className="banner-option"
          onClick={(e) => {
            openModal()
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