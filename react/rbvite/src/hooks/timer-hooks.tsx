import { useEffect } from 'react';

const useTimeout = <T extends (...args: unknown[]) => V, V = void>(
  callback: T,
  delay: number,
  args: unknown[] = []
) => {
  useEffect(() => {
    const tmout = setTimeout(callback, delay, ...args);
    return () => clearTimeout(tmout);
    // }, [callback, delay, args]);
  }, []);
};

function useInterval<T extends (...args: unknown[]) => V, V = void>(
  callback: T,
  delay: number,
  args: unknown[] = []
) {
  useEffect(() => {
    const intl = setInterval(callback, delay, ...args);
    return () => clearInterval(intl);
    // }, [callback, delay, args]);
  }, []);
}

function useTimer() {
  return {
    useTimeout,
    useInterval,
  };
}
export default useTimer;
