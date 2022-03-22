import { InfiniteScroll } from 'components';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useThrottle } from 'shared/hooks';
import type {
  IInfiniteScrollYoutube,
  IInfiniteScrollYoutubeProvider,
  IWithId,
} from './types';

export const InfiniteScrollYoutubeContext =
  createContext<IInfiniteScrollYoutube>({
    state: {
      data: [],
    },
    actions: {
      clearToken: () => undefined,
    },
  });

function getId<T extends IWithId>({ id }: T) {
  return typeof id === 'string' ? id : id.videoId;
}

function avoidDuplicateItems<T extends IWithId>(
  currentItems: T[],
  newItems: T[]
) {
  const currentItemsIds = currentItems.map(getId);
  const actuallyNewItems = newItems.filter(
    (item) => !currentItemsIds.includes(getId(item))
  );
  return currentItems.concat(actuallyNewItems);
}

function InfiniteScrollYoutubeProvider<T extends IWithId>({
  children,
  service,
}: IInfiniteScrollYoutubeProvider<T>) {
  const [available, trigger] = useThrottle({
    delay: 500,
  });
  const [intersecting, setIntersecting] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    if (!available || nextPageToken || !service) return;
    service().then(({ data: responseData }) => {
      trigger();
      setData(responseData.items);
      setNextPageToken(responseData.nextPageToken);
    });
  }, [available, nextPageToken, service, trigger]);

  useEffect(() => {
    if (!available || !intersecting || !nextPageToken || !service) return;
    service(nextPageToken).then(({ data: responseData }) => {
      trigger();
      setData((currentData) =>
        avoidDuplicateItems(currentData, responseData.items)
      );
      setNextPageToken(responseData.nextPageToken);
    });
  }, [available, nextPageToken, intersecting, service, trigger]);

  const value = useMemo(
    () => ({
      state: {
        data,
      },
      actions: {
        clearToken: () => setNextPageToken(''),
      },
    }),
    [data]
  );

  return (
    <InfiniteScroll callback={setIntersecting}>
      <InfiniteScrollYoutubeContext.Provider value={value}>
        {children}
      </InfiniteScrollYoutubeContext.Provider>
    </InfiniteScroll>
  );
}

export default InfiniteScrollYoutubeProvider;
