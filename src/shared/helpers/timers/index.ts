export function throttle<T>(callback: (param: T) => void, delay = 0) {
  let timer: NodeJS.Timeout;
  return function throttleClosure(param: T) {
    if (timer) return;
    timer = setTimeout(() => {
      callback(param);
      clearTimeout(timer);
    }, delay);
  };
}
