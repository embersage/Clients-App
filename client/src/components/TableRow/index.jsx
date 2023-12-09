import styles from './TableRow.module.scss';

const TableRow = (props) => {
  return (
    <tr className={styles.tableRow} onClick={props.onClick}>
      {[props.children].map((item) => {
        return (
          <>
            {props.values.map((value) => {
              return <td>{item[value]}</td>;
            })}
          </>
        );
      })}
    </tr>
  );
};

export default TableRow;

//<tr
//        className={styles.tableRow}
//        onClick={() => {
//          navigate(`/user/${id}`);
//        }}
//      >
//        <td data-title="id">{id}</td>
//        <td data-title="Имя">{name}</td>
//        <td data-title="Email">{email}</td>
//        <td data-title="Активирован">{activate ? 'Да' : 'Нет'}</td>
//        <td data-title="Дата регистрации">{`${dateReg.getUTCDay()}.${dateReg.getUTCMonth()}.${dateReg.getUTCFullYear()}`}</td>
//        <td data-title="Номер телефона">{phone}</td>
//        <td data-title="VK">{vk ? 'Да' : 'Нет'}</td>
//        <td data-title="Yandex">{yandex ? 'Да' : 'Нет'}</td>
//        <td data-title="Временный">{temporary ? 'Да' : 'Нет'}</td>
//        <td data-title="Последняя активность">{`${dateLastLogin.getUTCDay()}.${dateLastLogin.getUTCMonth()}.${dateLastLogin.getUTCFullYear()}`}</td>
//        <td data-title="Компания">{company}</td>
//        <td data-title="Уровень доступа">{access_level}</td>
//      </tr>
