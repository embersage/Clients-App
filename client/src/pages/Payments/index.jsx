import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { getPayments } from '../../redux/slices/paymentsSlice';
import styles from './Payments.module.scss';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';

const Payments = () => {
  const payments = useSelector((state) => state.payments.items);
  const page = useSelector((state) => state.payments.page);
  const status = useSelector((state) => state.payments.status);
  const search = useSelector((state) => state.filter.search);
  const dispatch = useDispatch();
  const values = [
    'id',
    'date_start',
    'date_end',
    'amount',
    'tariff.name',
    'user_account.id',
    'user_account.name',
    'company.name',
    'currency.name',
    'ckassa_payment_status.name',
  ];

  useEffect(() => {
    const fetchPayments = async () => {
      await dispatch(getPayments({ name: search, limit: 10, page }));
    };
    fetchPayments();
  }, [search, page]);

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header />
        {status === 'succeeded' ? (
          <>
            <Table
              headers={[
                'id',
                'Дата начала',
                'Дата окончания',
                'Сумма',
                'Тариф',
                'id аккаунта',
                'Имя',
                'Компания',
                'Валюта',
                'Статус оплаты',
              ]}
              caption={'Операции'}
            >
              {payments.map((item) => (
                <TableRow key={item.id} values={values}>
                  {item}
                </TableRow>
              ))}
            </Table>
          </>
        ) : (
          <div className={styles.loadingBanner}>
            <BsArrowClockwise className={styles.loadingIcon} size={75} />
          </div>
        )}
      </div>
    </>
  );
};

export default Payments;
