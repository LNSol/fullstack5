import { BrowserStorageMapper } from './browser-mappers';

export class BrowserStorage<T> {
  private key: string;
  private mapper: BrowserStorageMapper<T>;

  constructor(key: string, mapper: BrowserStorageMapper<T>) {
    this.key = key;
    this.mapper = mapper;
  }

  get(): T | void {
    const item = localStorage.getItem(this.key);
    if (item) return this.mapper.fromJson(localStorage.getItem(this.key));
  }
  set(data: T) {
    localStorage.setItem(this.key, this.mapper.toJson(data));
  }
}
