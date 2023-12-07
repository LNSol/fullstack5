import {
  PropsWithChildren,
  useCallback,
  useMemo,
  // useEffect,
  useState,
} from 'react';
import { useCounter } from '../hooks/counter-context';
import useTimer from '../hooks/timer-hooks';

type Props = {
  name: string;
  age: number;
};

const Hello = ({ name, age, children }: PropsWithChildren<Props>) => {
  const { plusCount } = useCounter();
  const { useTimeout, useInterval } = useTimer();
  const [sec, setSec] = useState(0);

  useTimeout(
    useCallback((name) => console.log(`Hello, ${name}!!!`), []),
    1000,
    useMemo(() => ['Lim'], [])
  );
  useTimeout(
    useCallback(() => console.log('X'), []),
    1000,
    useMemo(() => [], [])
  );

  useInterval(() => setSec((sec) => sec + 1), 1000);

  // useEffect(() => {
  //   const intl = setInterval(() => setSec((sec) => sec + 1), 1000);

  //   return () => {
  //     clearInterval(intl);
  //   };
  // }, []);

  return (
    <div style={{ border: '2px solid red' }}>
      <h1>
        Hello, {name}({age})
      </h1>
      {children}
      <button onClick={plusCount}>count + 1</button>
      <h2>sec: {sec}</h2>
    </div>
  );
};
export default Hello;
