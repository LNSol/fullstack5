import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from 'react';
import { DefaultSession } from '../dummy';
import { replaceElement } from '../utils/utils';
import { useFetch } from './fetch-hook';
// import { BrowserStorage } from '../data/browser-storage/browser-storage';
// import { SessionMapper } from '../data/browser-storage/browser-mappers';
// import { SessionBrowserStorageTest } from '../data/browser-storage/browser-storage-test';
import { STORAGE_KEY, browserStorage } from '../utils/browser-storage';

type SessionContextType = {
  session: Session;
  login: (loginUser: { id: number; name: string }) => void;
  logout: () => void;
  removeCartItem: (itemId: number) => void;
  saveCartItem: (item: { id?: number; name: string; price: number }) => void;
};

const SessionContext = createContext<SessionContextType>({
  session: DefaultSession,
  login: () => {},
  logout: () => {},
  removeCartItem: () => {},
  saveCartItem: () => {},
});

/* use BrowserStorage and BrowserStorageMapper */
// const sessionBrowserStorage = new BrowserStorage<Session>(
//   'SESSION',
//   new SessionMapper()
// );

/* use SessionBrowserStorageTest */
// const sessionBrowserStorage = new SessionBrowserStorageTest('SESSION');

/* use browserStorage function */
const { get: getSession, set: setSession } = browserStorage<Session>(
  STORAGE_KEY.SESSION
);

type SessionReducer = (session: Session, action: SessionAction) => Session;
const reducer: SessionReducer = (session, { type, payload }) => {
  let newSession;
  switch (type) {
    case 'LOGIN':
    case 'LOGOUT': {
      newSession = { ...session, loginUser: payload };
      // localStorage.setItem('SESSION', JSON.stringify(newSession));
      // sessionBrowserStorage.set(newSession);
      // return newSession;
      break;
    }
    case 'SAVE_CART': {
      // const id =
      //   payload.id || Math.max(...session.cart.map(({ id }) => id), 0) + 1;
      // const idx = session.cart.findIndex(({ id: itemId }) => itemId === id);

      // const newItem = { ...payload, id };
      // newSession = {
      //   ...session,
      //   cart:
      //     idx < 0
      //       ? [...session.cart, newItem]
      //       : replaceElement(session.cart, idx, newItem),
      // };
      // localStorage.setItem('SESSION', JSON.stringify(newSession));
      // sessionBrowserStorage.set(newSession);
      // return newSession;
      newSession = payload;
      break;
    }
    case 'REMOVE_CART': {
      newSession = {
        ...session,
        cart: session.cart.filter(({ id }) => id !== payload),
      };
      // localStorage.setItem('SESSION', JSON.stringify(newSession));
      // sessionBrowserStorage.set(newSession);
      // return newSession;
      break;
    }
    case 'SET':
      newSession = { ...payload };
  }
  // sessionBrowserStorage.set(newSession);
  setSession(newSession);
  return newSession;
};

const SessionProvider = ({ children }: { children: ReactNode }) => {
  // const [session, setSession] = useState<Session>(DefaultSession);
  const [session, dispatchSession] = useReducer<SessionReducer>(
    reducer,
    DefaultSession
  );
  // const { get: getSession, set: setSession } = useStorage<Session>('SESSION'); // hook으로 사용하면 reducer에서 set할 수가 없음.
  const data = useFetch<Session>('/data/sample.json', getSession());

  const login = useCallback(
    (loginUser: LoginUser) =>
      dispatchSession({ type: 'LOGIN', payload: loginUser }),
    []
  );

  const logout = () => dispatchSession({ type: 'LOGOUT', payload: null });

  const removeCartItem = (itemId: number) =>
    dispatchSession({ type: 'REMOVE_CART', payload: itemId });

  const saveCartItem = (item: { id?: number; name: string; price: number }) => {
    const id = item.id || Math.max(...session.cart.map(({ id }) => id), 0) + 1;
    const idx = session.cart.findIndex(({ id: itemId }) => itemId === id);
    const newItem = { ...item, id };
    const newSession = {
      ...session,
      cart:
        idx < 0
          ? [...session.cart, newItem]
          : replaceElement(session.cart, idx, newItem),
    };
    dispatchSession({ type: 'SAVE_CART', payload: newSession });
  };

  /* useState */
  // const login = (loginUser: { id: number; name: string }) => {
  //   setSession((prevSession) => ({
  //     ...prevSession,
  //     loginUser,
  //   }));
  // };

  // const logout = () => {
  //   setSession((prevSession) => ({
  //     ...prevSession,
  //     loginUser: null,
  //   }));
  // };

  // const removeCartItem = (itemId: number) => {
  //   setSession((prevSession) => ({
  //     ...prevSession,
  //     cart: prevSession.cart.filter(({ id }) => id !== itemId),
  //   }));
  // };

  // const saveCartItem = (item: { id?: number; name: string; price: number }) => {
  //   setSession((prevSession) => {
  //     const id =
  //       item.id || Math.max(...prevSession.cart.map(({ id }) => id), 0) + 1;
  //     const idx = prevSession.cart.findIndex(({ id: itemId }) => itemId === id);

  //     const newItem = { ...item, id };
  //     return {
  //       ...prevSession,
  //       cart:
  //         idx < 0
  //           ? [...prevSession.cart, newItem]
  //           : replaceElement(prevSession.cart, idx, newItem),
  //     };
  //   });
  // };

  useEffect(() => {
    // const sessionInStorage = sessionBrowserStorage.get();
    // const sessionInStorage = JSON.parse(localStorage.getItem('SESSION') || '');

    // const sessionInStorage = getSession();
    // if (sessionInStorage) {
    //   dispatchSession({ type: 'SET', payload: sessionInStorage });
    // } else if (data) {
    //   dispatchSession({ type: 'SET', payload: data });
    // }

    if (data) dispatchSession({ type: 'SET', payload: data });

    // dispatchSession({ type: 'SET', payload: session });
  }, [data]);

  // useEffect(() => {
  //   if (data) {
  //     dispatchSession({ type: 'SET', payload: data });
  //   }
  //   console.log('SESSION CONTEXT >>> ', data);
  // }, [data]);

  return (
    <SessionContext.Provider
      value={{ session, login, logout, removeCartItem, saveCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

// eslint-disable-next-line react-refresh/only-export-components
export { SessionProvider, useSession };
