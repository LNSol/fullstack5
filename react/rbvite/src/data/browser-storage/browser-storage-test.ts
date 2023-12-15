export interface BrowserStorageTest<T> {
  get(): T | void;
  set(data: T): void;
}

export class SessionBrowserStorageTest implements BrowserStorageTest<Session> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  get() {
    const item = localStorage.getItem(this.key);

    if (item) {
      const { loginUser, cart } = JSON.parse(item);
      return {
        loginUser,
        cart,
      };
    }
  }

  set(data: Session) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
