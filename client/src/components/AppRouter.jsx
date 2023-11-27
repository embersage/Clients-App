import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authRoutes, publicRoutes } from '../routes';
import { check } from '../http/userApi';
import { setUser, setIsAuth } from '../redux/slices/userSlice';

const AppRouter = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      try {
        await check();
        dispatch(setIsAuth(true));
        dispatch(setUser(true));
      } catch (error) {
        console.log(error.message);
      }
    };

    verify();
  }, []);

  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {isAuth &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
