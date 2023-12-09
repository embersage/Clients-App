import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import TariffBlock from '../../components/TariffBlock';
import PresentationBlock from '../../components/PresentationBlock';
import { fetchUser } from '../../http/usersApi';
import ModalWindow from '../../components/ModalWindow';
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
          <InformationBlock {...user} />
          <div className={styles.additionalInfo}>
            <TariffBlock />
            <PresentationBlock presentations={user.presentations} />
          </div>
        </div>
      </div>
      <ModalWindow {...user} />
    </>
  );
};

export default User;
