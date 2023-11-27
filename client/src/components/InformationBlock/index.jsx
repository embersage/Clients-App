import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { fetchUser } from '../../http/usersApi';
import styles from './InformationBlock.module.scss';

const InformationBlock = (props) => {
  const { id } = props;
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
    <div className={styles.informationBlock}>
      <div className={styles.headings}>
        <span>id</span>
        <span>Имя</span>
        <span>Email</span>
        <span>Пароль</span>
        <span>Активирован</span>
        <span>Код активации</span>
        <span>Дата регистрации</span>
        <span>Телефон</span>
        <span>VK</span>
        <span>Yandex</span>
        <span>Временный</span>
        <span>Последняя активность</span>
        <span>Email статус</span>
        <span>Роль</span>
        <span>Компания</span>
        <span>Уровень доступа</span>
      </div>
      <div className={styles.values}>
        <span>{user.id ? user.id : 'Нет данных'}</span>
        <span>{user.name ? user.name : 'Нет данных'}</span>
        <span>{user.email ? user.email : 'Нет данных'}</span>
        <span>
          {user.password ? (
            <FaRegEye className={styles.icon} size={15} onClick={() => {}} />
          ) : (
            'Нет данных'
          )}
        </span>
        <span>{user.activate ? 'Да' : 'Нет'}</span>
        <span>{user.activate_code ? user.activate_code : 'Нет данных'}</span>
        <span>
          {user.date_reg
            ? `${new Date(user.date_reg).getHours()}:${new Date(
                user.date_reg
              ).getMinutes()}
          ${new Date(user.date_reg).getDate()}.${
                new Date(user.date_reg).getMonth() + 1
              }.${new Date(user.date_reg).getFullYear()}`
            : 'Нет данных'}
        </span>
        <span>{user.spanhone ? user.spanhone : 'Нет данных'}</span>
        <span>{user.vk ? user.vk : 'Нет данных'}</span>
        <span>
          {user.yandex ? (
            <FaRegEye className={styles.icon} size={15} onClick={() => {}} />
          ) : (
            'Нет данных'
          )}
        </span>
        <span>{user.temporary ? 'Да' : 'Нет'}</span>
        <span>
          {user.date_last_login
            ? `${new Date(user.date_last_login).getHours()}:${new Date(
                user.date_last_login
              ).getMinutes()}
          ${new Date(user.date_last_login).getDate()}.${
                new Date(user.date_last_login).getMonth() + 1
              }.${new Date(user.date_last_login).getFullYear()}`
            : 'Нет данных'}
        </span>
        <span>{user.email_status ? user.email_status : 'Нет данных'}</span>
        <span>{user['role.name'] ? user['role.name'] : 'Нет данных'}</span>
        <span>
          {user['comspanany.name'] ? user['comspanany.name'] : 'Нет данных'}
        </span>
        <span>
          {user['access_level.name'] ? user['access_level.name'] : 'Нет данных'}
        </span>
      </div>
    </div>
  );
};

export default InformationBlock;
