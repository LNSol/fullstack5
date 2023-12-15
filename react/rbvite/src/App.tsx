// src/App.tsx
import { useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hello from './components/Hello';
import My from './components/My';
import './App.css';
import { useCounter } from './hooks/counter-context';
import { SessionProvider, useSession } from './hooks/session-context';
import StyledBox from './components/StyledBox';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './components/Login';
import Items from './pages/Items';
import Item from './pages/Item';
import NotFound from './pages/NotFound';
import ItemLayout from './pages/ItemLayout';

function App() {
  console.log('App@@@');
  const { login } = useSession();
  // const { count, plusCount } = useCounter();

  const fn = useCallback(() => {
    console.log('parents.fn@@@');
  }, []);

  // const MemoedHello = memo(Hello, () => true);

  return (
    // <>
    //   <h2>count: {count}</h2>
    //   <SessionProvider>
    //     <My />
    //   </SessionProvider>
    //   <Hello name='홍길동' age={30} fn={fn}>
    //     <h3>반갑습니다~</h3>
    //   </Hello>
    //   {/* <MemoedHello name='홍길동' age={30} fn={fn}>
    //     <h3>반갑습니다~</h3>
    //   </MemoedHello> */}
    //   <button onClick={plusCount}>count + 1</button>
    //   <StyledBox />
    // </>
    <div className='App'>
      <SessionProvider>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login login={login} />} />
          <Route path='/my' element={<My />} />
          <Route path='/items' element={<ItemLayout />}>
            <Route index element={<Items />} />
            <Route path=':id/*' element={<Item />} />
          </Route>
          <Route path='/hello' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SessionProvider>
    </div>
  );
}

export default App;
