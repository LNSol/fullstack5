import { ReactNode, createContext, useContext, useState } from 'react';

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

const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const plusCount = () => {
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    setCount((prev) => prev - 1);
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
