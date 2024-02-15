import styles from './TariffBlock.module.scss';

const TariffBlock = (props) => {
  const { tariffs } = { ...props };

  if (!tariffs || tariffs.length === 0) {
    return <span>Нет действующего тарифа ☹️</span>;
  }

  const validTariffs = tariffs?.filter((tariff) => {
    const currentDate = new Date();
    const endDate = new Date(tariff.payment_info.date_end);
    return endDate > currentDate;
  });

  const sortedTariffs = validTariffs?.sort((a, b) => {
    const dateA = new Date(a.payment_info.date_end);
    const dateB = new Date(b.payment_info.date_end);
    return dateA - dateB;
  });

  const currentTariff = sortedTariffs.length > 0 ? sortedTariffs[0] : null;

  return (
    <div className={styles.tariffBlock}>
      <h2>Текущий тариф</h2>
      {currentTariff ? (
        <>
          <p>Название: {currentTariff.name}</p>
          <p>
            Дата начала:{' '}
            {new Date(currentTariff.payment_info.date_start).toLocaleString()}
          </p>
          <p>
            Дата начала:{' '}
            {new Date(currentTariff.payment_info.date_end).toLocaleString()}
          </p>
          <p>Сумма: {currentTariff.payment_info.amount}</p>
        </>
      ) : (
        <span>Нет действующего тарифа ☹️</span>
      )}
    </div>
  );
};

export default TariffBlock;
