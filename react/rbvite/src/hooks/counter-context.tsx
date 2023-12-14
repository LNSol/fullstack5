import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  // useState,
} from 'react';

type CounterContextType = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

const CounterContext = createContext<CounterContextType>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

const reducer = (
  count: number,
  { type, payload = 1 }: { type: 'PLUS' | 'MINUS'; payload?: number }
) => {
  return count + (type === 'PLUS' ? payload : -payload);
  // switch (type) {
  //   case 'PLUS':
  //     return count + payload;
  //   case 'MINUS':
  //     return count - payload;
  // }
};

const CounterProvider = ({ children }: { children: ReactNode }) => {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);

  const plusCount = () => {
    // setCount((prev) => prev + 1);
    dispatch({ type: 'PLUS' });
  };

  const minusCount = () => {
    // setCount((prev) => prev - 1);
    dispatch({ type: 'MINUS' });
  };

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounter = () => useContext(CounterContext);

// eslint-disable-next-line react-refresh/only-export-components
export { CounterProvider, useCounter };
