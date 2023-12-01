import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import PresentationBlock from '../../components/PresentationBlock';
import { fetchUser } from '../../http/usersApi';
import styles from './User.module.scss';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchUser(id);
        setUser(res);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return <p>Загрузка</p>;
  }

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <h1 className={styles.title}>Информация о пользователе</h1>
          <div className={styles.blocks}>
            <div className={styles.info}>
              <h2 className={styles.subtitle}>Данные</h2>
              <InformationBlock {...user} />
            </div>
            <div className={styles.presentations}>
              <h2 className={styles.subtitle}>Презентации</h2>
              <PresentationBlock presentations={user.presentations} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
