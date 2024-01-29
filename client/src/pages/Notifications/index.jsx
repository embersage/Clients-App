import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsArrowClockwise } from 'react-icons/bs';
import { MdFilterAlt } from 'react-icons/md';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  getNotifications,
  setSelectedItems,
  setNotification,
  addSelectedItem,
  removeSelectedItem,
  removeNotifications,
  setNotificationsPage,
  getNotification,
  editNotification,
} from '../../redux/slices/notificationsSlice';
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
import styles from './Notifications.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';

const Notifications = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [clickedHeader, setClickedHeader] = useState();
  const notifications = useSelector((state) => state.notifications.items);
  const notification = useSelector((state) => state.notifications.notification);
  const selectedItems = useSelector(
    (state) => state.notifications.selectedItems
  );
  const page = useSelector((state) => state.notifications.page);
  const limit = useSelector((state) => state.notifications.limit);
  const totalCount = useSelector((state) => state.notifications.totalCount);
  const status = useSelector((state) => state.notifications.status);
  const search = useSelector((state) => state.filter.search);
  const usePagination = useSelector((state) => state.filter.usePagination);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  const values = [
    'id',
    'name',
    'description',
    'priority',
    'date_start',
    'date_end',
  ];
  const headers = [
    'id',
    'Название',
    'Описание',
    'Приоритет',
    'Дата начала',
    'Дата окончания',
  ];

  useEffect(() => {
    dispatch(
      getNotifications({
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
      })
    );
  }, [usePagination, page, sortBy, sortType, search]);

  useEffect(() => {
    if (
      status === 'succeeded' &&
      notification.date_start &&
      notification.date_end
    ) {
      setData([
        {
          propName: 'id',
          name: 'id',
          value: notification.id,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'name',
          name: 'Название',
          value: notification.name,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'description',
          name: 'Описание',
          value: notification.description,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'priority',
          name: 'Приоритет',
          value: notification.priority,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'date_start',
          name: 'Дата начала',
          value: notification.date_start,
          disabled: false,
          type: 'datetime-local',
        },
        {
          propName: 'date_end',
          name: 'Дата окончания',
          value: notification.date_end,
          disabled: false,
          type: 'datetime-local',
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

  const deleteNotifications = async (notifications) => {
    await dispatch(removeNotifications(notifications));
    await dispatch(
      getNotifications({
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
      })
    );
  };

  const handleCheckboxClick = () => {
    if (selectedItems.length !== notifications.length) {
      dispatch(setSelectedItems(notifications));
    } else {
      dispatch(setSelectedItems([]));
    }
  };

  const edit = async (editingIndex) => {
    const id = notification.id;
    await dispatch(
      editNotification({
        id,
        data: {
          [data[editingIndex].propName]: data[editingIndex].value,
        },
      })
    );
    await dispatch(
      getNotifications({
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
      })
    );
    const updatedNotification = await dispatch(getNotification({ id }));
    await dispatch(setNotification(updatedNotification.payload));
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
            {selectedItems.length > 0 && (
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  deleteNotifications({ notifications: selectedItems });
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
          </div>
          {usePagination && (
            <Pagination
              totalCount={totalCount}
              limit={limit}
              setPage={(item) => dispatch(setNotificationsPage(item))}
            />
          )}
        </Header>
        {status === 'succeeded' ? (
          <>
            <Table
              name={'Уведомления'}
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
              checked={selectedItems.length === notifications.length}
              onSelect={handleCheckboxClick}
            >
              {notifications.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={async () => {
                    await dispatch(getNotification({ id: item.id }));
                    await dispatch(setNotification(item));
                    await dispatch(setPressedButton('notification'));
                    await dispatch(setIsVisible(true));
                    /* navigate(`/notifications/${item.id}`); */
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
          {pressedButton === 'notification' && (
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

export default Notifications;
