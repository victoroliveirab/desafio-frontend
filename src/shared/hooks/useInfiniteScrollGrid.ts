import { useContext } from 'react';
import { InfiniteScrollYoutubeContext } from 'shared/providers/infinite-scroll-youtube';

export default function useInfiniteScrollYoutube() {
  const context = useContext(InfiniteScrollYoutubeContext);
  if (!context)
    throw new Error(
      'useInfiniteScrollYoutube must be used within an InfiniteScrollYoutube provider'
    );

  return context;
}
