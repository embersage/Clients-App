import styles from './TariffBlock.module.scss';

const TariffBlock = (props) => {
  const { payment_infos } = props;

  const validPayments = payment_infos?.filter((item) => {
    const currentDate = new Date();
    const endDate = new Date(item.date_end);
    return endDate > currentDate;
  });

  const sortedPayments = validPayments?.sort((a, b) => {
    const startDateA = new Date(a.date_start);
    const startDateB = new Date(b.date_start);

    if (startDateA > startDateB) {
      return -1;
    } else if (startDateA < startDateB) {
      return 1;
    }

    const endDateA = new Date(a.date_end);
    const endDateB = new Date(b.date_end);

    return endDateA - endDateB;
  });

  const currentPayment = sortedPayments.length > 0 ? sortedPayments[0] : null;

  return (
    <div className={styles.tariffBlock}>
      <h2>Текущий тариф</h2>
      {currentPayment ? (
        <ul className={styles.rows}>
          <li className={styles.row}>
            <span className={styles.property}>Название:</span>{' '}
            <span className={styles.value}>{currentPayment.tariff.name}</span>
          </li>
          <li className={styles.row}>
            <span className={styles.property}>Дата начала:</span>
            <span className={styles.value}>
              {new Date(currentPayment.date_start).toLocaleString()}
            </span>
          </li>
          <li className={styles.row}>
            <span className={styles.property}>Дата окончания:</span>
            <span className={styles.value}>
              {new Date(currentPayment.date_end).toLocaleString()}
            </span>
          </li>
          <li className={styles.row}>
            <span className={styles.property}>Сумма:</span>{' '}
            <span className={styles.value}>{currentPayment.amount}</span>
          </li>
        </ul>
      ) : (
        <span>Нет действующего тарифа ☹️</span>
      )}
    </div>
  );
};

export default TariffBlock;
