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
      data: undefined,
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
  noStartEmpty = false,
  service,
}: IInfiniteScrollYoutubeProvider<T>) {
  const startEmpty = !noStartEmpty;
  const [available, trigger] = useThrottle({
    delay: 500,
  });
  const [intersecting, setIntersecting] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');
  const [data, setData] = useState<T[] | undefined>(
    startEmpty ? [] : undefined
  );
  const [firstRequest, setFirstRequest] = useState(true);
  const [pageable, setPageable] = useState(false);

  useEffect(() => {
    if (!available || nextPageToken || !service || !firstRequest) return;
    setFirstRequest(false);
    service().then(({ data: responseData }) => {
      trigger();
      setData(responseData.items);
      setNextPageToken(responseData.nextPageToken);
      setPageable(!!responseData.nextPageToken);
    });
  }, [available, firstRequest, nextPageToken, service, trigger]);

  useEffect(() => {
    if (!available || !intersecting || !nextPageToken || !service || !pageable)
      return;
    service(nextPageToken).then(({ data: responseData }) => {
      trigger();
      setData((currentData) =>
        avoidDuplicateItems(currentData || [], responseData.items)
      );
      setNextPageToken(responseData.nextPageToken);
    });
  }, [available, nextPageToken, intersecting, service, trigger, pageable]);

  const value = useMemo(
    () => ({
      state: {
        data,
      },
      actions: {
        clearToken: () => {
          setNextPageToken('');
          setFirstRequest(true);
        },
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
