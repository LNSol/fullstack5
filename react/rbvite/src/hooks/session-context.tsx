import { ReactNode, createContext, useContext, useState } from 'react';
import { DefaultSession } from '../dummy';
import { replaceElement } from '../utils/utils';

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

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session>(DefaultSession);

  const login = (loginUser: { id: number; name: string }) => {
    setSession((prevSession) => ({
      ...prevSession,
      loginUser,
    }));
  };

  const logout = () => {
    setSession((prevSession) => ({
      ...prevSession,
      loginUser: null,
    }));
  };

  const removeCartItem = (itemId: number) => {
    setSession((prevSession) => ({
      ...prevSession,
      cart: prevSession.cart.filter(({ id }) => id !== itemId),
    }));
  };

  const saveCartItem = (item: { id?: number; name: string; price: number }) => {
    setSession((prevSession) => {
      const id =
        item.id || Math.max(...prevSession.cart.map(({ id }) => id), 0) + 1;
      const idx = prevSession.cart.findIndex(({ id: itemId }) => itemId === id);

      const newItem = { ...item, id };
      return {
        ...prevSession,
        cart:
          idx < 0
            ? [...prevSession.cart, newItem]
            : replaceElement(prevSession.cart, idx, newItem),
      };
    });
  };

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
