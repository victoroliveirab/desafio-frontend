import { ReactNode, useEffect, useRef } from 'react';
import { useIntersectionDom } from 'shared/hooks';

interface IInfiniteScroll {
  callback: (state: boolean) => void;
  children: ReactNode;
}

function InfiniteScroll({ callback, children }: IInfiniteScroll) {
  const ref = useRef<HTMLDivElement>(null);
  const intersecting = useIntersectionDom(ref);

  useEffect(() => {
    callback(intersecting);
  }, [callback, intersecting]);

  return (
    <>
      {children}
      <div ref={ref} style={{ height: 0, width: '100%' }} />
    </>
  );
}

export default InfiniteScroll;
