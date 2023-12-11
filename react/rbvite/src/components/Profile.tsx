import { useEffect } from 'react';
import { useFetch } from '../hooks/fetch-hook';
import { useSession } from '../hooks/session-context';

const Profile = () => {
  const data = useFetch<Session>('/data/sample.json');
  console.log('Profile@@@');
  const {
    session: { loginUser },
    logout,
  } = useSession();

  useEffect(() => {
    if (data) console.log('profile data >>> ', data);
  }, [data]);

  return (
    <>
      <div>User Name: {loginUser?.name}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};
export default Profile;
