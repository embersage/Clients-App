import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import TariffBlock from '../../components/TariffBlock';
import PresentationBlock from '../../components/PresentationBlock';
import ModalWindow from '../../components/ModalWindow';
import styles from './User.module.scss';
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/usersSlice';
import { setUser } from '../../redux/slices/userSlice';
import { BsArrowClockwise } from 'react-icons/bs';

const User = () => {
  const user = useSelector((state) => state.users.user);
  const { id } = useParams();
  const status = useSelector((state) => state.users.status);
  //const [user, setUser] = useState();
  const dispatch = useDispatch();
  const accessLevels = ['user', 'moderator', 'administrator'];
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    role: '',
    company: '',
    accessLevel: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUser({ id }));
    };

    fetchUser();
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
          {status === 'succeeded' ? (
            <>
              <InformationBlock {...user} />
              <div className={styles.additionalInfo}>
                <TariffBlock />
                <PresentationBlock presentations={user.presentations} />
              </div>
            </>
          ) : (
            <>
              <div className={styles.informationBlockLoading}>
                <BsArrowClockwise className={styles.loadingIcon} size={75} />
              </div>
              <div className={styles.additionalInfo}>
                <div className={styles.tariffBlockLoading}>
                  <BsArrowClockwise className={styles.loadingIcon} size={75} />
                </div>
                <div className={styles.presentationBlockLoading}>
                  <BsArrowClockwise className={styles.loadingIcon} size={75} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
