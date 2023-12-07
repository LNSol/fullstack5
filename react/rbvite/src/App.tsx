// src/App.tsx
import Hello from './components/Hello';
import My from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';
import { SessionProvider } from './hooks/session-context';

function App() {
  console.log('App@@@');
  const { count } = useCounter();

  return (
    <>
      <h2>count: {count}</h2>
      <SessionProvider>
        <My />
      </SessionProvider>
      <Hello name='홍길동' age={30}>
        <h3>반갑습니다~</h3>
      </Hello>
    </>
  );
}

export default App;
