import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { fetchUser } from '../../http/usersApi';
import styles from './InformationBlock.module.scss';

const InformationBlock = (props) => {
  const {
    id,
    name,
    email,
    password,
    activate,
    activate_code,
    date_reg,
    phone,
    vk,
    yandex,
    temporary,
    date_last_login,
    email_status,
  } = props;
  const role = props['role.name'];
  const company = props['company.name'];
  const accessLevel = props['access_level.name'];
  //const { id } = props;
  //const [user, setUser] = useState();
  //
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
  //
  //if (!user) {
  //  return <p>Загрузка</p>;
  //}

  return (
    <ul className={styles.informationBlock}>
      <li>
        <span className={styles.heading}>id</span>
        <span className={styles.value}>{id ? id : 'Нет данных'}</span>
      </li>
      <li>
        <span className={styles.heading}>Имя</span>
        <span className={styles.value}>{name ? name : 'Нет данных'}</span>
      </li>
      <li>
        <span className={styles.heading}>Email</span>
        <span className={styles.value}>{email ? email : 'Нет данных'}</span>
      </li>
      <li>
        <span className={styles.heading}>Пароль</span>
        <span className={styles.value}>
          {password ? (
            <FaRegEye className={styles.icon} size={15} onClick={() => {}} />
          ) : (
            'Нет данных'
          )}
        </span>
      </li>
      <li>
        <span className={styles.heading}>Активирован</span>
        <span className={styles.value}>{activate ? 'Да' : 'Нет'}</span>
      </li>
      <li>
        <span className={styles.heading}>Код активации</span>
        <span className={styles.value}>
          {activate_code ? activate_code : 'Нет данных'}
        </span>
      </li>
      <li>
        <span className={styles.heading}>Дата регистрации</span>
        <span className={styles.value}>
          {date_reg
            ? `${new Date(date_reg).getHours()}:${new Date(
                date_reg
              ).getMinutes()}
          ${new Date(date_reg).getDate()}.${
                new Date(date_reg).getMonth() + 1
              }.${new Date(date_reg).getFullYear()}`
            : 'Нет данных'}
        </span>
      </li>
      <li>
        <span className={styles.heading}>Телефон</span>
        <span className={styles.value}>{phone ? phone : 'Нет данных'}</span>
      </li>
      <li>
        <span className={styles.heading}>VK</span>
        <span className={styles.value}>{vk ? vk : 'Нет данных'}</span>
      </li>
      <li>
        <span className={styles.heading}>Yandex</span>
        <span className={styles.value}>
          {yandex ? (
            <FaRegEye className={styles.icon} size={15} onClick={() => {}} />
          ) : (
            'Нет данных'
          )}
        </span>
      </li>
      <li>
        <span className={styles.heading}>Временный</span>
        <span className={styles.value}>{temporary ? 'Да' : 'Нет'}</span>
      </li>
      <li>
        <span className={styles.heading}>Последняя активность</span>
        <span className={styles.value}>
          {date_last_login
            ? `${new Date(date_last_login).getHours()}:${new Date(
                date_last_login
              ).getMinutes()}
          ${new Date(date_last_login).getDate()}.${
                new Date(date_last_login).getMonth() + 1
              }.${new Date(date_last_login).getFullYear()}`
            : 'Нет данных'}
        </span>
      </li>
      <li>
        <span className={styles.heading}>Email статус</span>
        <span className={styles.value}>
          {email_status ? email_status : 'Нет данных'}
        </span>
      </li>
      <li>
        <span className={styles.heading}>Роль</span>
        <span className={styles.value}>{role ? role : 'Нет данных'}</span>
      </li>
      <li>
        <span className={styles.heading}>Компания</span>
        <span className={styles.value}>{company ? company : 'Нет данных'}</span>
      </li>
      <li>
        <span className={styles.heading}>Уровень доступа</span>
        <span className={styles.value}>
          {accessLevel ? accessLevel : 'Нет данных'}
        </span>
      </li>
    </ul>
  );
};

export default InformationBlock;

//<div className={styles.headings}>
//        <span>id</span>
//        <span>Имя</span>
//        <span>Email</span>
//        <span>Пароль</span>
//        <span>Активирован</span>
//        <span>Код активации</span>
//        <span>Дата регистрации</span>
//        <span>Телефон</span>
//        <span>VK</span>
//        <span>Yandex</span>
//        <span>Временный</span>
//        <span>Последняя активность</span>
//        <span>Email статус</span>
//        <span>Роль</span>
//        <span>Компания</span>
//        <span>Уровень доступа</span>
//      </div>
//      <div className={styles.values}>
//        <span>{id ? id : 'Нет данных'}</span>
//        <span>{name ? name : 'Нет данных'}</span>
//        <span>{email ? email : 'Нет данных'}</span>
//        <span>
//          {password ? (
//            <FaRegEye className={styles.icon} size={15} onClick={() => {}} />
//          ) : (
//            'Нет данных'
//          )}
//        </span>
//        <span>{activate ? 'Да' : 'Нет'}</span>
//        <span>{activate_code ? activate_code : 'Нет данных'}</span>
//        <span>
//          {date_reg
//            ? `${new Date(date_reg).getHours()}:${new Date(
//                date_reg
//              ).getMinutes()}
//          ${new Date(date_reg).getDate()}.${
//                new Date(date_reg).getMonth() + 1
//              }.${new Date(date_reg).getFullYear()}`
//            : 'Нет данных'}
//        </span>
//        <span>{phone ? phone : 'Нет данных'}</span>
//        <span>{vk ? vk : 'Нет данных'}</span>
//        <span>
//          {yandex ? (
//            <FaRegEye className={styles.icon} size={15} onClick={() => {}} />
//          ) : (
//            'Нет данных'
//          )}
//        </span>
//        <span>{temporary ? 'Да' : 'Нет'}</span>
//        <span>
//          {date_last_login
//            ? `${new Date(date_last_login).getHours()}:${new Date(
//                date_last_login
//              ).getMinutes()}
//          ${new Date(date_last_login).getDate()}.${
//                new Date(date_last_login).getMonth() + 1
//              }.${new Date(date_last_login).getFullYear()}`
//            : 'Нет данных'}
//        </span>
//        <span>{email_status ? email_status : 'Нет данных'}</span>
//        <span>{role ? role : 'Нет данных'}</span>
//        <span>{company ? company : 'Нет данных'}</span>
//        <span>{accessLevel ? accessLevel : 'Нет данных'}</span>
//      </div>
