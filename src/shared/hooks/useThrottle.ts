import { useCallback, useMemo, useState } from 'react';
import { throttle } from 'shared/helpers/timers';

interface IUseThrottle<T> {
  callback?: (param?: T) => void;
  delay?: number;
}

export default function useThrottle<T>({
  callback = () => undefined,
  delay = 0,
}: IUseThrottle<T>): [boolean, (param?: T) => void] {
  const [available, setAvailable] = useState(true);
  const timedFn = useMemo(
    () =>
      throttle((param?: T) => {
        callback(param);
        setAvailable(true);
      }, delay),
    [callback, delay]
  );
  const setAvailableThrottled = useCallback(
    (param?: T) => {
      setAvailable(false);
      timedFn(param);
    },
    [timedFn]
  );

  return [available, setAvailableThrottled];
}
