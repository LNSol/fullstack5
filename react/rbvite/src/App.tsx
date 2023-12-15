// src/App.tsx
import Hello from './components/Hello';
import My from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';
import { SessionProvider } from './hooks/session-context';
import { useCallback } from 'react';
import StyledBox from './components/StyledBox';

function App() {
  console.log('App@@@');
  const { count, plusCount } = useCounter();

  const fn = useCallback(() => {
    console.log('parents.fn@@@');
  }, []);

  // const MemoedHello = memo(Hello, () => true);

  return (
    <>
      <h2>count: {count}</h2>
      <SessionProvider>
        <My />
      </SessionProvider>
      <Hello name='홍길동' age={30} fn={fn}>
        <h3>반갑습니다~</h3>
      </Hello>
      {/* <MemoedHello name='홍길동' age={30} fn={fn}>
        <h3>반갑습니다~</h3>
      </MemoedHello> */}
      <button onClick={plusCount}>count + 1</button>
      <StyledBox />
    </>
  );
}

export default App;
