import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Cache = {
  [k: string]: unknown;
};

const fetchByCache = (function () {
  const cache: Cache = {};

  return function <T>(
    url: string,
    setter: Dispatch<SetStateAction<T | null>>,
    init?: RequestInit
  ) {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%', cache);
    if (url in cache) {
      console.log('url in cache!@@@@', cache);
      setter(cache[url] as T);
    } else {
      console.log('url not in cache!@#!@#', cache);
      fetch(url, init)
        .then((res) => res.json())
        .then((data) => {
          cache[url] = data;
          setter(data);
        });
    }
  };
})();

export function useFetch<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchByCache<T>(url, setData, { signal });

    return () => controller.abort();
  }, []);

  return data;
}
