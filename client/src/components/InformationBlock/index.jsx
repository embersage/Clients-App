import { useEffect, useState } from 'react';
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
    <div className={styles.wrapper}>
      <div className={styles.informationBlock}>
        <div className={styles.headings}>
          <p>id</p>
          <p>Имя</p>
          <p>Email</p>
          <p>Пароль</p>
          <p>Активирован</p>
          <p>Код активации</p>
          <p>Дата регистрации</p>
          <p>Телефон</p>
          <p>VK</p>
          <p>Yandex</p>
          <p>Временный</p>
          <p>Последняя активность</p>
          <p>Email статус</p>
          <p>Роль</p>
          <p>Компания</p>
          <p>Уровень доступа</p>
        </div>
        <div className={styles.values}>
          <p>{user.id ? user.id : 'Нет данных'}</p>
          <p>{user.name ? user.name : 'Нет данных'}</p>
          <p>{user.email ? user.email : 'Нет данных'}</p>
          <p>{user.password ? user.password : 'Нет данных'}</p>
          <p>{user.activate ? 'Да' : 'Нет'}</p>
          <p>{user.activate_code ? user.activate_code : 'Нет данных'}</p>
          <p>
            {user.date_reg
              ? `${new Date(user.date_reg).getHours()}:${new Date(
                  user.date_reg
                ).getMinutes()}
          ${new Date(user.date_reg).getDate()}.${
                  new Date(user.date_reg).getMonth() + 1
                }.${new Date(user.date_reg).getFullYear()}`
              : 'Нет данных'}
          </p>
          <p>{user.phone ? user.phone : 'Нет данных'}</p>
          <p>{user.vk ? user.vk : 'Нет данных'}</p>
          <p>{user.yandex ? user.yandex : 'Нет данных'}</p>
          <p>{user.temporary ? 'Да' : 'Нет'}</p>
          <p>
            {user.date_last_login
              ? `${new Date(user.date_last_login).getHours()}:${new Date(
                  user.date_last_login
                ).getMinutes()}
          ${new Date(user.date_last_login).getDate()}.${
                  new Date(user.date_last_login).getMonth() + 1
                }.${new Date(user.date_last_login).getFullYear()}`
              : 'Нет данных'}
          </p>
          <p>{user.email_status ? user.email_status : 'Нет данных'}</p>
          <p>{user['role.name'] ? user['role.name'] : 'Нет данных'}</p>
          <p>{user['company.name'] ? user['company.name'] : 'Нет данных'}</p>
          <p>
            {user['access_level.name']
              ? user['access_level.name']
              : 'Нет данных'}
          </p>
        </div>
      </div>
      <div className={styles.presentationsBlock}>Presentations</div>
    </div>
  );
};

export default InformationBlock;
