type LoginUser = { id: number; name: string };

type Cart = { id: number; name: string; price: number }[];

type Session = {
  loginUser: LoginUser | null;
  cart: Cart;
};

type SessionAction =
  | { type: 'LOGIN'; payload: LoginUser }
  | { type: 'LOGOUT'; payload?: null }
  // | { type: 'SAVE_CART'; payload: { id?: number; name: string; price: number } }
  | { type: 'SAVE_CART'; payload: Session }
  | { type: 'REMOVE_CART'; payload: number }
  | { type: 'SET'; payload: Session };
