import styles from './Table.module.scss';

const Table = (props) => {
  const {
    checked,
    name,
    headers,
    values,
    onHeaderClick,
    icon,
    clickedHeader,
    showCheckbox,
  } = props;

  const handleCheckboxClick = (event) => {
    props?.onSelect?.();
  };

  return (
    <table className={styles.table} cellSpacing={0} cellPadding={0}>
      <thead>
        {/* {name && (
          <tr className={styles.tableName}>
            <th colSpan={headers.length}>{name}</th>
          </tr>
        )} */}
        <tr className={styles.tableHeader}>
          {showCheckbox && (
            <th className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                onChange={handleCheckboxClick}
                checked={checked}
              />
            </th>
          )}
          {headers.map((item, index) => (
            <th
              key={index}
              onClick={() => {
                onHeaderClick(values[index]);
              }}
            >
              <div className={styles.headers}>
                {item}
                {clickedHeader === values[index] && <span>{icon}</span>}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};
export default Table;
