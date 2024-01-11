import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { MdFilterAlt } from 'react-icons/md';
import {
  getNotifications,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
} from '../../redux/slices/notificationsSlice';
import { setIsVisible, setPressedButton } from '../../redux/slices/modalSlice';
import { setUsePagination } from '../../redux/slices/filterSlice';
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
  const notifications = useSelector((state) => state.notifications.items);
  const selectedItems = useSelector(
    (state) => state.notifications.selectedItems
  );
  const page = useSelector((state) => state.notifications.page);
  const status = useSelector((state) => state.notifications.status);
  const search = useSelector((state) => state.filter.search);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  const usePagination = useSelector((state) => state.filter.usePagination);
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
    const fetchNotifications = async () => {
      await dispatch(getNotifications({ limit: 10, page, name: search }));
    };
    fetchNotifications();
  }, [search, page]);

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
          </div>
          <Pagination />
        </Header>
        {status === 'succeeded' ? (
          <>
            <Table
              name={'Уведомления'}
              headers={headers}
              values={values}
              checked={selectedItems.length === notifications.length}
              onSelect={handleCheckboxClick}
            >
              {notifications.map((item) => (
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
