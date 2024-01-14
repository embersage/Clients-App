import { useEffect, useRef, useState } from 'react';
import styles from './TableRow.module.scss';

const TableRow = (props) => {
  const checkboxRef = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const { checked } = props;

  const handleRowClick = (event) => {
    if (checkboxRef.current && checkboxRef.current.contains(event.target)) {
      return;
    }

    props?.onClick?.();
  };

  const handleCheckboxClick = (event) => {
    setIsSelected(!isSelected);

    if (!isSelected) {
      props?.onSelect?.();
    } else {
      props?.onUnselect?.();
    }
  };

  useEffect(() => {
    setIsSelected(checked);
  }, [checked]);

  return (
    <tr className={styles.tableRow} onClick={handleRowClick}>
      {props.showCheckbox && (
        <td>
          <input
            ref={checkboxRef}
            type="checkbox"
            onChange={handleCheckboxClick}
            checked={isSelected}
          />
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
