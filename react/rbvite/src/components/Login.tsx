import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-context';

const Login = () => {
  console.log('Login@@@');
  const { login } = useSession();
  const { plusCount, minusCount } = useCounter();
  const [id, setId] = useState('');
  // const [name, setName] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const changeId = (evt: ChangeEvent<HTMLInputElement>) =>
    setId(evt.currentTarget.value);

  // const changeName = (evt: ChangeEvent<HTMLInputElement>) => {
  //   setName(evt.currentTarget.value);
  // };

  const submit = (evt: FormEvent) => {
    evt.preventDefault();
    const name = nameRef.current?.value;
    if (name) login({ id: Number(id), name });
  };

  useEffect(() => {
    plusCount();
    return () => minusCount();
  }, [plusCount, minusCount]);

  return (
    <form onSubmit={submit}>
      <div>
        Login ID(숫자): <input type='number' value={id} onChange={changeId} />
      </div>
      <div>
        {/* Login Name: <input type='text' value={name} onChange={changeName} /> */}
        Login Name: <input type='text' ref={nameRef} />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};
export default Login;
