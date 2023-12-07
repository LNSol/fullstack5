import { ReactNode, createContext, useContext, useState } from 'react';
import { DefaultSession } from '../dummy';

type SessionContextType = {
  session: Session;
  login: (loginUser: { id: number; name: string }) => void;
  logout: () => void;
  removeCartItem: (itemId: number) => void;
  addCartItem: (newItem: { name: string; price: number }) => void;
};

const SessionContext = createContext<SessionContextType>({
  session: DefaultSession,
  login: () => {},
  logout: () => {},
  removeCartItem: () => {},
  addCartItem: () => {},
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

  const addCartItem = (newItem: { name: string; price: number }) => {
    setSession((prevSession) => {
      const nextItemId =
        Math.max(...prevSession.cart.map(({ id }) => id), 0) + 1;
      return {
        ...prevSession,
        cart: [...prevSession.cart, { id: nextItemId, ...newItem }],
      };
    });
  };

  return (
    <SessionContext.Provider
      value={{ session, login, logout, removeCartItem, addCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

// eslint-disable-next-line react-refresh/only-export-components
export { SessionProvider, useSession };
