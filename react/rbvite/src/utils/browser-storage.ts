export enum STORAGE_KEY {
  SESSION = 'SESSION',
}

export function browserStorage<T>(key: STORAGE_KEY) {
  const get = (): T | undefined => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  };

  const set = (data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  return { get, set };
}
