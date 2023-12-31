import { useRef } from 'react';
import styles from './TableRow.module.scss';

const TableRow = (props) => {
  const checkboxRef = useRef();

  const handleRowClick = (event) => {
    if (checkboxRef.current && checkboxRef.current.contains(event.target)) {
      return;
    }

    props.onClick();
  };

  return (
    <tr className={styles.tableRow} onClick={handleRowClick}>
      {props.showCheckbox && (
        <td>
          <input ref={checkboxRef} type="checkbox" />
        </td>
      )}
      {[props.children].map((item) => {
        return props.values.map((value, index) => {
          return <td key={index}>{item[value]}</td>;
        });
      })}
    </tr>
  );
};

export default TableRow;
