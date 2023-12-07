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
  } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const itemRef = useRef<Cart[number]>({ id: 0, name: '', price: 0 });
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const { useTimeout } = useTimer();
  useTimeout(() => console.log('My!!!'), 1000);

  const saveItem = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const id = idRef.current;
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;

    if (id && name && price) {
      saveCartItem({ id: Number(id.value), name, price: Number(price) });
      idRef.current.value = '';
      nameRef.current.value = '';
      priceRef.current.value = '';
      itemRef.current = { id: 0, name: '', price: 0 };
      setIsEdit(false);
      setIsDirty(false);
    }
  };

  const setForm = ({ id, name, price }: Cart[number]) => {
    if (idRef.current && nameRef.current && priceRef.current) {
      idRef.current.value = id.toString();
      nameRef.current.value = name;
      priceRef.current.value = price.toString();
    }
  };

  return (
    <>
      {loginUser ? <Profile /> : <Login />}
      <ul>
        {cart.map(({ id, name, price }) => (
          <li
            key={id}
            onClick={() => {
              itemRef.current = { id, name, price };
              setIsEdit(true);
              setForm({ id, name, price });
            }}
            aria-hidden
          >
            {name}({price})
            <button
              onClick={(evt) => {
                evt.stopPropagation();
                removeCartItem(id);
              }}
            >
              DEL
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={saveItem}>
        <input type='number' hidden ref={idRef} />
        상품명:{' '}
        <input
          type='text'
          ref={nameRef}
          onChange={() => {
            const name = nameRef.current?.value;
            const origin = itemRef.current;
            if (isEdit && origin.name !== name) setIsDirty(true);
            else setIsDirty(false);
          }}
        />
        &nbsp; 가격:{' '}
        <input
          type='number'
          ref={priceRef}
          onChange={() => {
            const price = priceRef.current?.value || 0;
            const origin = itemRef.current;
            if (isEdit && origin.price !== Number(price)) setIsDirty(true);
            else setIsDirty(false);
          }}
        />
        원&nbsp;
        {!isEdit ? (
          <button>추가</button>
        ) : isDirty ? (
          <button>저장</button>
        ) : null}
      </form>
    </>
  );
};
export default My;
