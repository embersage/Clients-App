import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { MdFilterAlt } from 'react-icons/md';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  getPayments,
  setSelectedItems,
  setPayment,
  addSelectedItem,
  removeSelectedItem,
  removePayments,
  setPaymentsPage,
  getPayment,
  editPayment,
} from '../../redux/slices/paymentsSlice';
import { getCurrencies } from '../../redux/slices/currenciesSlice';
import { getTariffs } from '../../redux/slices/tariffsSlice';
import {
  addSelectedTariff,
  removeSelectedTariff,
  addSelectedCurrency,
  removeSelectedCurrency,
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

const Payments = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [clickedHeader, setClickedHeader] = useState();
  const currencies = useSelector((state) => state.currencies.items);
  const tariffs = useSelector((state) => state.tariffs.items);
  const payments = useSelector((state) => state.payments.items);
  const payment = useSelector((state) => state.payments.payment);
  const selectedItems = useSelector((state) => state.payments.selectedItems);
  const page = useSelector((state) => state.payments.page);
  const limit = useSelector((state) => state.payments.limit);
  const totalCount = useSelector((state) => state.payments.totalCount);
  const status = useSelector((state) => state.payments.status);
  const search = useSelector((state) => state.filter.search);
  const usePagination = useSelector((state) => state.filter.usePagination);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  const amount = useSelector((state) => state.filter.amount);
  const selectedTariffs = useSelector((state) => state.filter.selectedTariffs);
  const selectedCurrencies = useSelector(
    (state) => state.filter.selectedCurrencies
  );
  const values = [
    'id',
    'date_start',
    'date_end',
    'amount',
    'tariff.id',
    'tariff.name',
    'user_account.id',
    'user_account.name',
    'id_currency',
    'ckassa_payment_status.id',
    'ckassa_payment_status.name',
  ];
  const headers = [
    'id',
    'Дата начала',
    'Дата окончания',
    'Сумма',
    'id тарифа',
    'Тариф',
    'id аккаунта',
    'Имя',
    'Код валюты',
    'Код оплаты',
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
        selectedTariffs,
        selectedCurrencies,
      })
    );
    dispatch(getCurrencies());
    dispatch(getTariffs({ usePagination: false }));
  }, [
    usePagination,
    page,
    sortBy,
    sortType,
    search,
    amount,
    selectedTariffs,
    selectedCurrencies,
  ]);

  useEffect(() => {
    if (status === 'succeeded' && payment.date_start && payment.date_end) {
      setData([
        {
          propName: 'id',
          name: 'id',
          value: payment.id,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'date_start',
          name: 'Дата начала',
          value: payment.date_start,
          disabled: false,
          type: 'datetime-local',
        },
        {
          propName: 'date_end',
          name: 'Дата окончания',
          value: payment.date_end,
          disabled: false,
          type: 'datetime-local',
        },
        {
          propName: 'amount',
          name: 'Сумма',
          value: payment.amount,
          disabled: false,
          type: 'number',
        },
        {
          propName: 'id_user_account',
          name: 'id пользователя',
          value: payment.id_user_account,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'id_tariff',
          name: 'id тарифа',
          value: payment.id_tariff,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'id_currency',
          name: 'id валюты',
          value: payment.id_currency,
          disabled: true,
          type: 'text',
        },
      ]);
    }
  }, [status]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onClickHandle = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
  };

  const onChangeHandle = (event, item) => {
    setData(
      data.map((object) => {
        return item.name === object.name
          ? { ...object, value: event.target.value }
          : object;
      })
    );
  };

  const deletePayments = async (payments) => {
    await dispatch(removePayments(payments));
    await dispatch(
      getPayments({
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
        amount,
        selectedTariffs,
        selectedCurrencies,
      })
    );
  };

  const handleCheckboxClick = () => {
    if (selectedItems.length !== payments.length) {
      dispatch(setSelectedItems(payments));
    } else {
      dispatch(setSelectedItems([]));
    }
  };

  const edit = async (editingIndex) => {
    const id = payment.id;
    await dispatch(
      editPayment({
        id,
        data: {
          [data[editingIndex].propName]: data[editingIndex].value,
        },
      })
    );
    await dispatch(
      getPayments({
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
        amount,
        selectedTariffs,
        selectedCurrencies,
      })
    );
    const updatedPayment = await dispatch(getPayment({ id }));
    await dispatch(setPayment(updatedPayment.payload));
  };

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header>
          <Search />
          {selectedItems.length > 0 && (
            <Button
              onClick={(event) => {
                event.preventDefault();
                deletePayments({ payments: selectedItems });
              }}
            >
              <AiOutlineDelete
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Удалить</span>
            </Button>
          )}
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
                  <FiChevronUp />
                ) : sortType === 'DESC' ? (
                  <FiChevronDown />
                ) : (
                  ''
                )
              }
              checked={
                selectedItems.length > 0 &&
                payments.length > 0 &&
                selectedItems.length === payments.length
              }
              onSelect={handleCheckboxClick}
              showCheckbox={true}
            >
              {payments.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={async () => {
                    await dispatch(getPayment({ id: item.id }));
                    await dispatch(setPayment(item));
                    await dispatch(setPressedButton('payment'));
                    await dispatch(setIsVisible(true));
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
              {currencies && (
                <>
                  <button>Валюты</button>
                  <ul>
                    {currencies.map((item) => {
                      return (
                        <li key={item.id}>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => {
                                !selectedCurrencies.includes(item.id)
                                  ? dispatch(addSelectedCurrency(item.id))
                                  : dispatch(removeSelectedCurrency(item.id));
                              }}
                              checked={selectedCurrencies.includes(item.id)}
                            />
                            {item.id}
                            {item.name}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              {tariffs && (
                <>
                  <button>Тарифы</button>
                  <ul>
                    {tariffs.map((item) => {
                      return (
                        <li key={item.id}>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => {
                                !selectedTariffs.includes(item.id)
                                  ? dispatch(addSelectedTariff(item.id))
                                  : dispatch(removeSelectedTariff(item.id));
                              }}
                              checked={selectedTariffs.includes(item.id)}
                            />
                            {item.id}
                            {item.name}
                            {item.amount}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
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
          {pressedButton === 'payment' && (
            <>
              {data.map((item, index) => {
                return (
                  <label key={index}>
                    <span>{item.name}</span>
                    {isEditing && editingIndex === index ? (
                      <input
                        ref={inputRef}
                        type={item.type}
                        value={inputValue}
                        placeholder={!item.value ? 'Нет данных' : ''}
                        disabled={item.disabled}
                        onChange={(event) => {
                          setInputValue(event.target.value);
                          onChangeHandle(event, item);
                        }}
                      />
                    ) : (
                      <span
                        onClick={() => {
                          if (!item.disabled) {
                            onClickHandle(index);
                            setInputValue(
                              item.value
                                ? item.type === 'datetime-local'
                                  ? new Date(
                                      new Date(item.value).getTime() -
                                        new Date(
                                          item.value
                                        ).getTimezoneOffset() *
                                          60000
                                    )
                                      .toISOString()
                                      .slice(0, -1)
                                  : item.value
                                : ''
                            );
                          }
                        }}
                      >
                        {item.value
                          ? item.type === 'datetime-local'
                            ? new Date(item.value).toLocaleString()
                            : `${item.value}`
                          : 'Нет данных'}
                      </span>
                    )}
                  </label>
                );
              })}
              {isEditing && (
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    edit(editingIndex);
                    setIsEditing(false);
                    setEditingIndex(null);
                  }}
                >
                  Сохранить
                </button>
              )}
            </>
          )}
        </form>
      </ModalWindow>
    </>
  );
};

export default Payments;
