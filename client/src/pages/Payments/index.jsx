import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { MdFilterAlt } from 'react-icons/md';
import {
  getPayments,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
} from '../../redux/slices/paymentsSlice';
import { setIsVisible, setPressedButton } from '../../redux/slices/modalSlice';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import ModalWindow from '../../components/ModalWindow';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import Search from '../../components/Search';
import styles from './Payments.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';

const Payments = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments.items);
  const selectedItems = useSelector((state) => state.payments.selectedItems);
  const page = useSelector((state) => state.payments.page);
  const status = useSelector((state) => state.payments.status);
  const search = useSelector((state) => state.filter.search);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  //const [allAreSelected, setAllAreSelected] = useState(false);
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
  const headers = [
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
  ];

  useEffect(() => {
    const fetchPayments = async () => {
      await dispatch(getPayments({ limit: 10, page, name: search }));
    };
    fetchPayments();
  }, [search, page]);

  const handleCheckboxClick = () => {
    if (selectedItems.length !== payments.length) {
      dispatch(setSelectedItems(payments));
    } else {
      dispatch(setSelectedItems([]));
    }
  };

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header>
          <Search />
          <div className={headerStyles.buttons}>
            <Button
              onClick={() => {
                dispatch(setIsVisible(true));
                dispatch(setPressedButton('filters'));
              }}
            >
              <MdFilterAlt
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Фильтры</span>
            </Button>
          </div>
          <Pagination />
        </Header>
        {status === 'succeeded' ? (
          <>
            <Table
              name={'Промокоды'}
              headers={headers}
              values={values}
              checked={selectedItems.length === payments.length}
              onSelect={handleCheckboxClick}
            >
              {payments.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    dispatch(setSelectedItems([item]));
                    //navigate(`/user/${item.id}`);
                  }}
                  values={values}
                  showCheckbox={true}
                  checked={selectedItems.includes(item)}
                  onSelect={() => {
                    dispatch(addSelectedItem(item));
                  }}
                  onUnselect={() => {
                    dispatch(removeSelectedItem(item));
                  }}
                >
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
      <ModalWindow>
        <form className={modalStyles.content}>
          {pressedButton === 'filters' && (
            <>
              <label>
                <span>Фильтры</span>
              </label>
            </>
          )}
        </form>
      </ModalWindow>
    </>
  );
};

export default Payments;
