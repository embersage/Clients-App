import styles from './Table.module.scss';

const Table = (props) => {
  const headers = props.headers;

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeader}>
          {headers.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};
export default Table;
