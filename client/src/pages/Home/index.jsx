import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { useEffect } from 'react';
import { check } from '../../http/userApi';
import { setIsAuth, setUser } from '../../redux/slices/userSlice';
import styles from './Home.module.scss';

const Home = () => {
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

  if (isAuth) {
    return (
      <>
        <Menu />
        <Header />
      </>
    );
  }
};

export default Home;
