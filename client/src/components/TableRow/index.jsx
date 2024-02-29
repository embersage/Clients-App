import { memo, useEffect, useRef, useState } from 'react';
import styles from './TableRow.module.scss';

const TableRow = memo((props) => {
  const checkboxRef = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const { checked, values } = props;

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
        <td className={styles.checkbox}>
          <input
            ref={checkboxRef}
            type="checkbox"
            onChange={handleCheckboxClick}
            checked={isSelected}
          />
        </td>
      )}
      {values.map((value, index) => {
        const nestedProperties = value.split('.');
        let propertyValue = props.children;
        nestedProperties.forEach((prop) => {
          propertyValue = propertyValue?.[prop];
        });
        return (
          <td key={index}>{propertyValue === true ? 'Да' : propertyValue}</td>
        );
      })}
    </tr>
  );
});

export default TableRow;
