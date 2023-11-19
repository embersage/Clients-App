import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/slices/usersSlice';
import UserRow from '../../components/UserRow';
import styles from './Users.module.scss';

const Users = () => {
  const users = useSelector((state) => state.users.items);
  const status = useSelector((state) => state.users.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getUsers());
    };
    fetchUsers();
  }, []);

  return (
    <>
      {status === 'succeeded' ? (
        <table className={styles.usersTable}>
          <thead>
            <tr className={styles.userHeader}>
              <th>id</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Пароль</th>
              <th>Активирован</th>
              <th>Код активации</th>
              <th>Дата регистрации</th>
              <th>Номер телефона</th>
              <th>VK</th>
              <th>Yandex</th>
              <th>Временный</th>
              <th>Последняя активность</th>
              <th>Email статус</th>
              <th>id роли</th>
              <th>id компании</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <UserRow key={item.id} {...item} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Загрузка</p>
      )}
    </>
  );
};

export default Users;

//qwerty@mail.ru 2281337
