import styles from './TariffBlock.module.scss';

const TariffBlock = (props) => {
  const { payment_infos } = props;

  if (!payment_infos || payment_infos.length === 0) {
    return <span>Нет действующего тарифа ☹️</span>;
  }

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
        <>
          <p>Название: {currentPayment.tariff.name}</p>
          <p>
            Дата начала: {new Date(currentPayment.date_start).toLocaleString()}
          </p>
          <p>
            Дата окончания: {new Date(currentPayment.date_end).toLocaleString()}
          </p>
          <p>Сумма: {currentPayment.amount}</p>
        </>
      ) : (
        <span>Нет действующего тарифа ☹️</span>
      )}
    </div>
  );
};

export default TariffBlock;

/* [
  {
    id: 2188,
    date_start: '2024-01-23T09:43:47.317Z',
    date_end: null,
    amount: 490,
    payment_number: '1706003056',
    id_user_account: 29,
    id_tariff: 6,
    id_ckassa_payment_status: 1,
    id_currency: 10,
    id_company: null,
    tariff: {
      id: 6,
      name: 'Базовый',
      description:
        '<ul class="list"> <li>До <strong>40</strong> участников одновременно</li> <li>До <strong>50</strong> презентаций</li> <li>До <strong>50</strong> групп</li> <li>До <strong>50</strong> слайдов</li> <li>Экспорт отчётов без ограничений</li> <li>Приватные презентации</li> <li>Онлайн-поддержка</li> </ul>',
      amount: 490,
      duration: { months: 1 },
      id_tariff_description: 2,
      id_currency: 10,
    },
  },
  {
    id: 11,
    date_start: '2023-04-04T17:40:14.649Z',
    date_end: '2123-05-04T17:40:24.716Z',
    amount: 0,
    payment_number: null,
    id_user_account: 29,
    id_tariff: 5,
    id_ckassa_payment_status: 5,
    id_currency: 11,
    id_company: null,
    tariff: {
      id: 5,
      name: 'Минимум',
      description:
        '<ul class="list"> <li>До <strong>10</strong> участников одновременно</li> <li>До <strong>20</strong> презентаций</li> <li>До <strong>2</strong> групп</li> <li>До <strong>25</strong> слайдов</li> <li>До <strong>2</strong> отчётов</li> </ul>',
      amount: 0,
      duration: { months: 1 },
      id_tariff_description: 1,
      id_currency: 10,
    },
  },
  {
    id: 31,
    date_start: '2023-06-30T14:58:35.757Z',
    date_end: '2123-09-30T20:16:50.197Z',
    amount: 990,
    payment_number: '131007389567',
    id_user_account: 29,
    id_tariff: 7,
    id_ckassa_payment_status: 5,
    id_currency: 10,
    id_company: null,
    tariff: {
      id: 7,
      name: 'Продвинутый',
      description:
        '<ul class="list"> <li>До <strong>200</strong> участников одновременно</li> <li>До <strong>1000</strong> презентаций</li> <li>До <strong>1000</strong> групп</li> <li>Количество слайдов не ограничено</li> <li>Экспорт отчётов без ограничений</li> <li>Приватные презентации</li> <li>Онлайн-поддержка</li> </ul>',
      amount: 1,
      duration: { months: 1 },
      id_tariff_description: 3,
      id_currency: 10,
    },
  },
] */
