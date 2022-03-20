import { RefObject, useEffect, useState } from 'react';

export default function useIntersectionDom<T extends HTMLElement>(
  elementRef: RefObject<T> | null
) {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    function observe([entry]: IntersectionObserverEntry[]) {
      setIntersecting(entry.isIntersecting);
    }
    const observer = new IntersectionObserver(observe, {
      root: null,
      rootMargin: '5px',
      threshold: 0,
    });
    if (elementRef?.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [elementRef]);

  return intersecting;
}
