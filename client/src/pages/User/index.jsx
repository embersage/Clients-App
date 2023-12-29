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
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/slices/usersSlice';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
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

  //useEffect(() => {
  //  const getUser = async () => {
  //    try {
  //      const res = await fetchUser(id);
  //      setUser(res);
  //    } catch (error) {
  //      console.log(error.message);
  //    }
  //  };
  //
  //  getUser();
  //}, []);

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
          <InformationBlock {...user} />
          <div className={styles.additionalInfo}>
            <TariffBlock />
            <PresentationBlock presentations={user.presentations} />
          </div>
        </div>
      </div>
      <ModalWindow>
        <form className={modalStyles.content}>
          <h2>Редактирование данных</h2>
          <label>
            <span>Имя: </span>
            <input
              value={user.name}
              onChange={(event) => {
                setData({ ...data, name: event.target.value });
              }}
            />
          </label>
          <label>
            <span>Email: </span>
            <input
              value={user.email}
              onChange={(event) => {
                setData({ ...data, email: event.target.value });
              }}
            />
          </label>
          <label>
            <span>Пароль: </span>
            <input
              value={user.password}
              onChange={(event) => {
                setData({ ...data, password: event.target.value });
              }}
            />
          </label>
          <label>
            <span>Номер телефона: </span>
            <input
              value={user.number}
              onChange={(event) => {
                setData({ ...data, number: event.target.value });
              }}
            />
          </label>
          <label>
            <span>Роль: </span>
            <input
              value={user.role}
              onChange={(event) => {
                setData({ ...data, role: event.target.value });
              }}
            />
          </label>
          <label>
            <span>Компания: </span>
            <input
              value={user.company}
              onChange={(event) => {
                setData({ ...data, company: event.target.value });
              }}
            />
          </label>
          <label>
            <span>Уровень доступа: </span>
            <input
              value={user.accessLevel}
              onChange={(event) => {
                setData({ ...data, accessLevel: event.target.value });
              }}
            />
          </label>
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Изменить
          </button>
        </form>
      </ModalWindow>
    </>
  );
};

export default User;
