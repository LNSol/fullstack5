export function useStorage<T>(key: string) {
  const get = (): T | void => {
    const item = localStorage.getItem(key);
    if (item) {
      const data = JSON.parse(item);
      return data;
    }
  };
  const set = (data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  return { get, set };
}
