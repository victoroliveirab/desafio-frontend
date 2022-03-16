import { useEffect, useState } from 'react';

function hasGoogleSdkLoaded() {
  return !!window.google;
}

export default function useGoogleAuth() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready && hasGoogleSdkLoaded()) {
      setReady(true);
      return undefined;
    }
    const interval = setInterval(() => {
      const loaded = hasGoogleSdkLoaded();
      setReady(loaded);
      if (loaded) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [ready]);

  return {
    ...window.google,
  };
}
