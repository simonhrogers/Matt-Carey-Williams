'use client';

import Lottie from "lottie-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LogoAnimation from "@/assets/svg/Logo.json"
import NavbarLocation from '@/components/global/Navbar/NavbarLocation'

export function LogoWrapper({shouldAnimate, formatAsLink, showLocation}) {

  const logoRef = useRef()
  const [locationCanAnimate, setLocationCanAnimate] = useState(false)

  useEffect(() => {
    if (!shouldAnimate) {
      logoRef.current.goToAndStop(logoRef.current.getDuration(true), true)
    }
  }, [shouldAnimate])

  return (
    <div className="logo-wrapper">
      <Link className='logo-link' href='/' scroll={false}>
        <div className="logo">Matt Carey-Williams</div>
        <Lottie 
          lottieRef={logoRef}
          animationData={LogoAnimation}
          loop={false}
          autoplay={shouldAnimate ? true : false}
          direction={shouldAnimate ? 1 : -1}
          // onDataReady={() => (logoRef.current.play())}
          onComplete={() => (setLocationCanAnimate(true))}
          className="logo-lottie"
          aria-label="Matt Carey-Williams"
        />
        {showLocation ? (
          <NavbarLocation
            canAnimate={locationCanAnimate}
          />
        ) : null}
      </Link>
    </div>
  )
}

