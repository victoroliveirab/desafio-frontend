import { useCallback, useState } from 'react';
import type { ApiServiceState } from 'api/types';

type SetApiService<T> = (param: ApiServiceState<T>) => void;

export default function useServiceState<T>(): [
  ApiServiceState<T>,
  SetApiService<T>
] {
  const [service, setService] = useState<ApiServiceState<T>>();

  const setServiceCallback = useCallback((newService: ApiServiceState<T>) => {
    setService(() => newService);
  }, []);

  return [service, setServiceCallback];
}
