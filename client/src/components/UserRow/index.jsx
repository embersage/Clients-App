import styles from './UserRow.module.scss';

const UserRow = (props) => {
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
    role,
    company,
  } = props;

  return (
    <tr className={styles.userRow}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>{activate ? 'Да' : 'Нет'}</td>
      <td>{activate_code}</td>
      <td>{date_reg}</td>
      <td>{phone}</td>
      <td>{vk}</td>
      <td>{yandex}</td>
      <td>{temporary ? 'Да' : 'Нет'}</td>
      <td>{date_last_login}</td>
      <td>{email_status}</td>
      <td>{role}</td>
      <td>{company}</td>
    </tr>
  );
};

export default UserRow;
