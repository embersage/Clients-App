import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PiArrowsClockwise } from 'react-icons/pi';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdSaveAlt } from 'react-icons/md';
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
import {
  setEditingIndex,
  setIsEditing,
  setIsVisible,
  setPressedButton,
} from '../../redux/slices/modalSlice';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import ModalWindow from '../../components/ModalWindow';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import Search from '../../components/Search';
import Input from '../../components/Input';
import styles from './Payments.module.scss';
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';

const Payments = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
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
  const isEditing = useSelector((state) => state.modal.isEditing);
  const editingIndex = useSelector((state) => state.modal.editingIndex);
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
    const fetchData = async () => {
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
      await dispatch(getCurrencies());
      await dispatch(getTariffs({ usePagination: false }));
    };
    fetchData();
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
    if (status === 'succeeded' && payment) {
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

  const onClickHandle = (index) => {
    dispatch(setIsEditing(true));
    dispatch(setEditingIndex(index));
  };

  const onChangeHandle = (item, value) => {
    setData(
      data.map((object) => {
        return item.name === object.name ? { ...object, value } : object;
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

  const handleCheckboxClick = async () => {
    if (selectedItems.length !== payments.length) {
      await dispatch(setSelectedItems(payments));
    } else {
      await dispatch(setSelectedItems([]));
    }
  };

  const edit = async (editingIndex) => {
    const id = payment.id;
    await dispatch(
      editPayment({
        id: payment.id,
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
              onClickHandler={(event) => {
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
              page="payments"
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
            <PiArrowsClockwise className={styles.loadingIcon} size={75} />
          </div>
        )}
      </div>
      <ModalWindow>
        <form className={modalStyles.content}>
          {pressedButton === 'filters' && (
            <>
              <h2>Фильтры</h2>
              {currencies && (
                <>
                  <h3>Валюты:</h3>
                  <ul>
                    {currencies.map((item) => {
                      return (
                        <li key={item.id}>
                          <label className={modalStyles.inputWrapper}>
                            <div className={modalStyles.info}>
                              <span>{item.id}</span>
                              <span>{item.name}</span>
                            </div>
                            <input
                              type="checkbox"
                              onChange={() => {
                                !selectedCurrencies.includes(item.id)
                                  ? dispatch(addSelectedCurrency(item.id))
                                  : dispatch(removeSelectedCurrency(item.id));
                              }}
                              checked={selectedCurrencies.includes(item.id)}
                            />
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              {tariffs && (
                <>
                  <h3>Тарифы:</h3>
                  <ul>
                    {tariffs.map((item) => {
                      return (
                        <li key={item.id}>
                          <label className={modalStyles.inputWrapper}>
                            <div className={modalStyles.info}>
                              <span>{item.id}</span>
                              <div>
                                <span>{item.name}</span>
                                <span>{item.amount}</span>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              onChange={() => {
                                !selectedTariffs.includes(item.id)
                                  ? dispatch(addSelectedTariff(item.id))
                                  : dispatch(removeSelectedTariff(item.id));
                              }}
                              checked={selectedTariffs.includes(item.id)}
                            />
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              <h2>Пагинация</h2>
              <label className={modalStyles.inputWrapper}>
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
              <label className={modalStyles.inputWrapper}>
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
                  <label className={modalStyles.inputWrapper} key={index}>
                    <span
                      className={
                        !item.disabled
                          ? `${modalStyles.property} ${modalStyles.editable}`
                          : `${modalStyles.property}`
                      }
                    >
                      {item.name}
                    </span>
                    {isEditing && editingIndex === index ? (
                      <div className={modalStyles.editing}>
                        <Input
                          delay={0}
                          value={inputValue}
                          onChangeHandler={(value) => {
                            onChangeHandle(item, value);
                          }}
                          placeholder={!item.value ? 'Нет данных' : ''}
                          type={item.type}
                        />
                        <Button
                          onClickHandler={(event) => {
                            event.preventDefault();
                            edit(editingIndex);
                            dispatch(setIsEditing(false));
                            dispatch(setEditingIndex(null));
                          }}
                        >
                          <MdSaveAlt
                            size={30}
                            className={styles.icon}
                            color="rgba(171,171,171, 0.75)"
                          />
                          <span>Сохранить</span>
                        </Button>
                      </div>
                    ) : (
                      <span
                        className={
                          !item.disabled
                            ? `${modalStyles.value} ${modalStyles.editable}`
                            : `${modalStyles.property}`
                        }
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
            </>
          )}
        </form>
      </ModalWindow>
    </>
  );
};

export default Payments;
