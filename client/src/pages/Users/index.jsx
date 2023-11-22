import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/slices/usersSlice';
import UserRow from '../../components/UserRow';
import styles from './Users.module.scss';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';

const Users = () => {
  const users = useSelector((state) => state.users.items);
  const page = useSelector((state) => state.users.page);
  const status = useSelector((state) => state.users.status);
  const search = useSelector((state) => state.filter.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getUsers({ name: search, limit: 10, page }));
    };

    fetchUsers();
  }, [search, page]);

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header />
        {status === 'succeeded' ? (
          <>
            <Table
              headers={[
                'id',
                'Имя',
                'Email',
                'Пароль',
                'Активирован',
                'Код активации',
                'Дата регистрации',
                'Номер телефона',
                'VK',
                'Yandex',
                'Временный',
                'Последняя активность',
                'Email статус',
                'Роль',
                'Компания',
              ]}
            >
              {users.map((item) => (
                <UserRow key={item.id} {...item} />
              ))}
            </Table>
          </>
        ) : (
          <p>Загрузка</p>
        )}
      </div>
    </>
  );
};

export default Users;
