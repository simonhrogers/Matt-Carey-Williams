import { PropsWithChildren, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { LazyMotion, m, AnimatePresence } from 'framer-motion'
import delQuery from '@/utils/delQuery'
const framerFeatures = () => import("@/utils/framerFeatures").then(res => res.default)

export function Animate({ children }: PropsWithChildren) {

  // Stop the browser from scrolling the exiting page to top before transition 
  useEffect(() => {
    if (history.scrollRestoration !== "manual") {
      history.scrollRestoration = "manual";
    }
  })

  const router = useRouter()
  const currentRoute = router.pathname
  const baseRoute = currentRoute.split('/')[1]
  const scrollPositions = useRef<{[url: string]: {
    x: number
    y: number
  }}>({})
  const isBack = useRef(false)

  const onRouteChangeComplete = (url: any) => {
    const restoreScrollPosition = () => {
      if (isBack.current && scrollPositions.current[url]) {
        console.log('scrolling to', scrollPositions.current[url]);
        window.scroll({
          top: scrollPositions.current[url].y,
          behavior: "auto",
        })
      } else {
        window.scroll({
          top: 0,
          behavior: "auto",
        })
      }
      isBack.current = false
    }
  
    if (document.readyState === 'complete') {
      // If the page has already loaded, restore the scroll position immediately
      restoreScrollPosition();
    } else {
      // Otherwise, wait for the page to load before restoring the scroll position
      window.addEventListener('load', restoreScrollPosition, { once: true });
    }
  }

  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true
      return true
    })
    const onRouteChangeStart = () => {
      const url = router.asPath
      scrollPositions.current[url] = {
        x: window.scrollX,
        y: window.scrollY,
      }
    }
    router.events.on("routeChangeStart", onRouteChangeStart)
    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart)
    }
  }, [router])

  return (
    <LazyMotion features={framerFeatures}>
      <AnimatePresence 
        mode="wait" 
        initial={false}
        onExitComplete={() => onRouteChangeComplete(router.asPath)} 
      >
        <m.div
          className='framer'
          key={delQuery(router.asPath)} 
          initial="pageInitial" 
          animate="pageAnimate"
          exit="pageInitial"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
              transform: 'translateZ(0)',
              zIndex: 999,
              transitionEnd: {
                transform: 'none',
                zIndex: 'unset',
              }
            },
          }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  )
}

