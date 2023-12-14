import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from 'react';
import { DefaultSession } from '../dummy';
import { replaceElement } from '../utils/utils';
import { useFetch } from './fetch-hook';

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

type SessionReducer = (session: Session, action: SessionAction) => Session;
const reducer: SessionReducer = (session, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return { ...session, loginUser: payload };
    case 'LOGOUT':
      return { ...session, loginUser: null };
    case 'SAVE_CART': {
      const id =
        payload.id || Math.max(...session.cart.map(({ id }) => id), 0) + 1;
      const idx = session.cart.findIndex(({ id: itemId }) => itemId === id);

      const newItem = { ...payload, id };

      return {
        ...session,
        cart:
          idx < 0
            ? [...session.cart, newItem]
            : replaceElement(session.cart, idx, newItem),
      };
    }
    case 'REMOVE_CART':
      return {
        ...session,
        cart: session.cart.filter(({ id }) => id !== payload),
      };
    case 'SET':
      return { ...payload };
  }
};

const SessionProvider = ({ children }: { children: ReactNode }) => {
  // const [session, setSession] = useState<Session>(DefaultSession);
  const [session, dispatchSession] = useReducer<SessionReducer>(
    reducer,
    DefaultSession
  );
  const data = useFetch<Session>('/data/sample.json');

  const login = (loginUser: { id: number; name: string }) =>
    dispatchSession({ type: 'LOGIN', payload: loginUser });

  const logout = () => dispatchSession({ type: 'LOGOUT' });

  const removeCartItem = (itemId: number) =>
    dispatchSession({ type: 'REMOVE_CART', payload: itemId });

  const saveCartItem = (item: { id?: number; name: string; price: number }) =>
    dispatchSession({ type: 'SAVE_CART', payload: item });

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
    if (data) {
      dispatchSession({ type: 'SET', payload: data });
    }
    console.log('SESSION CONTEXT >>> ', data);
  }, [data]);

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
