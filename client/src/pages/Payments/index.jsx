import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { MdFilterAlt } from 'react-icons/md';
import {
  getPayments,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setPaymentsPage,
} from '../../redux/slices/paymentsSlice';
import {
  setSortBy,
  setSortType,
  setUsePagination,
} from '../../redux/slices/filterSlice';
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
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';

const Payments = () => {
  const dispatch = useDispatch();
  const [clickedHeader, setClickedHeader] = useState();
  const payments = useSelector((state) => state.payments.items);
  const selectedItems = useSelector((state) => state.payments.selectedItems);
  const page = useSelector((state) => state.payments.page);
  const status = useSelector((state) => state.payments.status);
  const limit = useSelector((state) => state.payments.limit);
  const totalCount = useSelector((state) => state.payments.totalCount);
  const search = useSelector((state) => state.filter.search);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  const usePagination = useSelector((state) => state.filter.usePagination);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);
  const amount = useSelector((state) => state.filter.amount);
  const tariff = useSelector((state) => state.filter.tariff);
  const currency = useSelector((state) => state.filter.currency);
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
    dispatch(
      getPayments({
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
        amount,
        tariff,
        currency,
      })
    );
  }, [usePagination, page, sortBy, sortType, search, amount, tariff]);

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
          {usePagination && (
            <Pagination
              totalCount={totalCount}
              limit={limit}
              setPage={(item) => dispatch(setPaymentsPage(item))}
            />
          )}
        </Header>
        {status === 'succeeded' ? (
          <>
            <Table
              name={'Операции'}
              headers={headers}
              values={values}
              clickedHeader={clickedHeader}
              onHeaderClick={(item) => {
                dispatch(setSortBy(item));
                setClickedHeader(item);
                if (sortType === 'DESC' || !sortType) {
                  dispatch(setSortType('ASC'));
                }
                if (sortType === 'ASC') {
                  dispatch(setSortType('DESC'));
                } else if (sortType) {
                  dispatch(setSortType(''));
                }
              }}
              icon={
                sortType === 'ASC' ? (
                  <IoIosArrowRoundUp />
                ) : sortType === 'DESC' ? (
                  <IoIosArrowRoundDown />
                ) : (
                  ''
                )
              }
              checked={selectedItems.length === payments.length}
              onSelect={handleCheckboxClick}
            >
              {payments.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    dispatch(setSelectedItems([item]));
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
                <span>Включить пагинацию</span>
                <input
                  type="radio"
                  name="usePagination"
                  onChange={() => {
                    if (!usePagination) {
                      dispatch(setUsePagination(true));
                    }
                  }}
                  checked={usePagination}
                />
              </label>
              <label>
                <span>Выключить пагинацию</span>
                <input
                  type="radio"
                  name="usePagination"
                  onChange={() => {
                    if (usePagination) {
                      dispatch(setUsePagination(false));
                    }
                  }}
                  checked={!usePagination}
                />
              </label>
            </>
          )}
        </form>
      </ModalWindow>
    </>
  );
};

export default Payments;
