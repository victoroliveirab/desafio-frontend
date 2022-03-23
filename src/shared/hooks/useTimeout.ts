import { useCallback, useEffect, useRef, useState } from 'react';

interface IUseTimeout {
  callback: () => void;
  timeout: number;
  startNow?: boolean;
}

export default function useTimeout({
  callback,
  timeout,
  startNow = true,
}: IUseTimeout) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [start, setStart] = useState(startNow);
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setStart(false);
    }
  }, []);

  const startTimer = useCallback(() => {
    setStart(true);
  }, []);

  useEffect(() => {
    if (start) timerRef.current = setTimeout(callback, timeout);
    return clearTimer;
  }, [callback, clearTimer, start, timeout]);

  return { start: startTimer, clear: clearTimer };
}
