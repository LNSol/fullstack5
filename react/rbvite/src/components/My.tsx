import { FormEvent, useRef, useState } from 'react';
import Login from './Login';
import Profile from './Profile';
import { useSession } from '../hooks/session-context';
import useTimer from '../hooks/timer-hooks';

const My = () => {
  const {
    session: { loginUser, cart },
    removeCartItem,
    saveCartItem,
    login,
  } = useSession();
  const [isDirty, setIsDirty] = useState(false);
  const [id, setId] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const { useTimeout } = useTimer();
  useTimeout(() => console.log('My!!!'), 1000);

  const clearForm = () => {
    if (nameRef.current && priceRef.current) {
      nameRef.current.value = '';
      priceRef.current.value = '';
      setId(0);
      setIsDirty(false);
    }
  };

  const saveItem = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (nameRef.current && priceRef.current) {
      saveCartItem({
        id,
        name: nameRef.current.value,
        price: Number(priceRef.current.value),
      });
    }
    clearForm();
  };

  const setForm = ({ id, name, price }: Cart[number]) => {
    if (nameRef.current && priceRef.current) {
      setId(id);
      nameRef.current.value = name;
      priceRef.current.value = price.toString();
    }
  };

  const setDirty = () => {
    const name = nameRef.current?.value;
    const price = Number(priceRef.current?.value);

    const item = cart.find(({ id: itemId }) => itemId === id);

    setIsDirty(item?.name !== name || item?.price !== price);
  };

  return (
    <>
      {loginUser ? <Profile /> : <Login login={login} />}
      <ul>
        {cart.map(({ id, name, price }) => (
          <li key={id}>
            <a href='#none' onClick={() => setForm({ id, name, price })}>
              {name}({price})
            </a>
            <button
              onClick={(evt) => {
                evt.stopPropagation();
                removeCartItem(id);
                clearForm();
              }}
            >
              DEL
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={saveItem}>
        상품명: <input type='text' ref={nameRef} onChange={setDirty} />
        &nbsp; 가격: <input type='number' ref={priceRef} onChange={setDirty} />
        원&nbsp;
        {!id ? <button>추가</button> : isDirty ? <button>저장</button> : null}
      </form>
    </>
  );
};
export default My;
