import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
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

  return (
    <div className={styles.informationBlock}>
      <h2>Данные</h2>
      <ul className={styles.data}>
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
          <span className={styles.value}>
            {company ? company : 'Нет данных'}
          </span>
        </li>
        <li>
          <span className={styles.heading}>Уровень доступа</span>
          <span className={styles.value}>
            {accessLevel ? accessLevel : 'Нет данных'}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default InformationBlock;
