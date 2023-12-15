import styles from './TableRow.module.scss';

const TableRow = (props) => {
  return (
    <tr className={styles.tableRow} onClick={props.onClick}>
      {[props.children].map((item) => {
        return props.values.map((value, index) => {
          return <td key={index}>{item[value]}</td>;
        });
      })}
    </tr>
  );
};

export default TableRow;
