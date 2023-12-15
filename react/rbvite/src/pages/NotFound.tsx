import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import useTimer from '../hooks/timer-hooks';

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { useTimeout } = useTimer();
  console.log(`${pathname} is not found && go to home`);

  /* 2초 후 홈으로 이동 */
  // useTimeout(() => navigate('/'), 2000);

  /* 2초 후 이전 페이지로 이동 */
  useTimeout(() => navigate(-1), 2000);

  return (
    <div>
      <h2>{pathname} 404 Not Found</h2>
      <p>
        홈으로 돌아가기
        {/* <Navigate to='/' /> */}
      </p>
    </div>
  );
};
export default NotFound;
