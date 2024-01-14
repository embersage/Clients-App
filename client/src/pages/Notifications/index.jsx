import { useEffect, useState } from 'react';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clickedHeader, setClickedHeader] = useState();
  const notifications = useSelector((state) => state.notifications.items);
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
                  onClick={() => {
                    dispatch(setNotification(item));
                    navigate(`/notifications/${item.id}`);
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

export default Notifications;
