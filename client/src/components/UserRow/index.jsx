import styles from './UserRow.module.scss';
import { useNavigate } from 'react-router-dom';

const UserRow = (props) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    email,
    activate,
    date_reg,
    phone,
    vk,
    yandex,
    temporary,
    date_last_login,
  } = props;
  const access_level = props['access_level.name'];
  const company = props['company.name'];

  const dateReg = new Date(date_reg);
  const dateLastLogin = new Date(date_last_login);

  return (
    <tr
      className={styles.userRow}
      onClick={() => {
        navigate(`/user/${id}`);
      }}
    >
      <td data-title="id">{id}</td>
      <td data-title="Имя">{name}</td>
      <td data-title="Email">{email}</td>
      <td data-title="Активирован">{activate ? 'Да' : 'Нет'}</td>
      <td data-title="Дата регистрации">{`${dateReg.getUTCDay()}.${dateReg.getUTCMonth()}.${dateReg.getUTCFullYear()}`}</td>
      <td data-title="Номер телефона">{phone}</td>
      <td data-title="VK">{vk ? 'Да' : 'Нет'}</td>
      <td data-title="Yandex">{yandex ? 'Да' : 'Нет'}</td>
      <td data-title="Временный">{temporary ? 'Да' : 'Нет'}</td>
      <td data-title="Последняя активность">{`${dateLastLogin.getUTCDay()}.${dateLastLogin.getUTCMonth()}.${dateLastLogin.getUTCFullYear()}`}</td>
      <td data-title="Компания">{company}</td>
      <td data-title="Уровень доступа">{access_level}</td>
    </tr>
  );
};

export default UserRow;
