export interface BrowserStorageMapper<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromJson(json: any): T;
  toJson(data: T): string;
}

export class SessionMapper implements BrowserStorageMapper<Session> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromJson(json: any) {
    const data = JSON.parse(json);
    return {
      loginUser: data.loginUser,
      cart: data.cart,
    };
  }
  toJson(data: Session) {
    return JSON.stringify(data);
  }
}
