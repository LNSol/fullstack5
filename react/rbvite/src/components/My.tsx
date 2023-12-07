import { useRef } from 'react';
import Login from './Login';
import Profile from './Profile';
import { useSession } from '../hooks/session-context';
import useTimer from '../hooks/timer-hooks';

const My = () => {
  const {
    session: { loginUser, cart },
    removeCartItem,
    addCartItem,
  } = useSession();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const { useTimeout } = useTimer();
  useTimeout(() => console.log('My!!!'), 1000);

  const addItem = () => {
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;

    if (name && price) addCartItem({ name, price: Number(price) });
  };

  return (
    <>
      {loginUser ? <Profile /> : <Login />}
      <ul>
        {cart.map(({ id, name, price }) => (
          <li key={id}>
            {name}({price})
            <button onClick={() => removeCartItem(id)}>DEL</button>
          </li>
        ))}
      </ul>
      상품명: <input type='text' ref={nameRef} />
      &nbsp; 가격: <input type='number' ref={priceRef} />
      원&nbsp;
      <button type='button' onClick={addItem}>
        추가
      </button>
    </>
  );
};
export default My;
