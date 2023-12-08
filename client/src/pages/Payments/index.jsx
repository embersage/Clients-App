import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { getPayments } from '../../redux/slices/paymentsSlice';
import UserRow from '../../components/UserRow';
import styles from './Payments.module.scss';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';

const Payments = () => {
  const payments = useSelector((state) => state.payments.items);
  const page = useSelector((state) => state.payments.page);
  const status = useSelector((state) => state.payments.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPayments = async () => {
      await dispatch(getPayments({limit: 10, page }));
    };
    fetchPayments();
  }, [page]);

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
            >
              {payments.map((item) => (
                <UserRow key={item.id} {...item} />
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



