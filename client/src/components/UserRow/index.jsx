import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import styles from './UserRow.module.scss';
import { useState } from 'react';

const UserRow = (props) => {
  const [visible, setVisible] = useState(false);
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

  const dateReg = new Date(date_reg);
  const dateLastLogin = new Date(date_last_login);

  return (
    <tr className={styles.userRow}>
      <td data-title="id">{id}</td>
      <td data-title="Имя">{name}</td>
      <td data-title="Email">{email}</td>
      <td data-title="Пароль" className={styles.password}>
        <FaRegEyeSlash
          size={30}
          className={styles.passwordIcon}
          onClick={() => {
            setVisible(!false);
          }}
        />
      </td>
      <td data-title="Активирован">{activate ? 'Да' : 'Нет'}</td>
      <td data-title="Код активации">{activate_code}</td>
      <td data-title="Дата регистрации">{`${dateReg.getUTCDay()}.${dateReg.getUTCMonth()}.${dateReg.getUTCFullYear()}`}</td>
      <td data-title="Номер телефона">{phone}</td>
      <td data-title="VK">{vk}</td>
      <td data-title="Yandex">{yandex}</td>
      <td data-title="Временный">{temporary ? 'Да' : 'Нет'}</td>
      <td data-title="Последняя активность">{`${dateLastLogin.getUTCDay()}.${dateLastLogin.getUTCMonth()}.${dateLastLogin.getUTCFullYear()}`}</td>
      <td data-title="Email статус">{email_status}</td>
      <td data-title="Роль">{role}</td>
      <td data-title="Компания">{company}</td>
    </tr>
  );
};

export default UserRow;
