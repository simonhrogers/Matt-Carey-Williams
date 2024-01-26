import { useState, createContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export const OriginContext = createContext<boolean>(false);

export default function OriginTracker({ children }: React.PropsWithChildren) {
  const [isWithinPage, setIsWithinPage] = useState(false);
  const isInitialLoadRef = useRef(true);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    setIsWithinPage(true);
    return () => setIsWithinPage(false);
  }, [pathname]);

  return (
    <OriginContext.Provider value={isWithinPage}>
      {children}
    </OriginContext.Provider>
  );
}