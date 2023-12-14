import {
  PropsWithChildren,
  memo,
  // useCallback,
  useEffect,
  useReducer,
  // useMemo,
  // useEffect,
  // useState,
} from 'react';
// import { useCounter } from '../hooks/counter-context';
// import useTimer from '../hooks/timer-hooks';
// import Sample from './Sample';

type Props = {
  name: string;
  age: number;
  fn: () => void;
};

const Hello = memo(
  ({ name, age, fn, children }: PropsWithChildren<Props>) => {
    console.log('Hello@@@');
    // const { plusCount } = useCounter();
    // const { useTimeout, useInterval } = useTimer();
    // const [sec, setSec] = useState(0);

    // useTimeout(
    //   useCallback((name) => console.log(`Hello, ${name}!!!`), []),
    //   1000,
    //   useMemo(() => ['Lim'], [])
    // );
    // useTimeout(
    //   useCallback(() => console.log('X'), []),
    //   1000,
    //   useMemo(() => [], [])
    // );

    // useInterval(() => setSec((sec) => sec + 1), 1000);

    // useEffect(() => {
    //   const intl = setInterval(() => setSec((sec) => sec + 1), 1000);

    //   return () => {
    //     clearInterval(intl);
    //   };
    // }, []);

    // const [isActive, setIsActive] = useState(false);
    const [isActive, toggleActive] = useReducer((pre) => !pre, false);

    useEffect(() => {
      console.log('child.fn >>> ', fn);
      fn();
    }, [fn]);

    useEffect(() => {
      console.log('child.age >>> ', age);
    }, [age]);

    return (
      <div style={{ border: '2px solid red' }}>
        <h1>
          Hello, {name}({age})
        </h1>
        {children}
        {/* <button onClick={plusCount}>count + 1</button> */}
        {/* <h2>sec: {sec}</h2> */}
        <hr />
        {/* <Sample /> */}
        Active: {isActive + ''}
        <button onClick={toggleActive}>toggleActive</button>
      </div>
    );
  },
  ({ children: prevName }, { children: currName }) => prevName === currName
);
export default Hello;
