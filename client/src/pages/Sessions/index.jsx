import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { MdFilterAlt } from 'react-icons/md';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import {
  getSessions,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
  setSessionsPage,
} from '../../redux/slices/sessionsSlice';
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
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import Search from '../../components/Search';
import styles from './Sessions.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';
import ModalWindow from '../../components/ModalWindow';
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';

const Sessions = () => {
  const dispatch = useDispatch();
  const [clickedHeader, setClickedHeader] = useState();
  const sessions = useSelector((state) => state.sessions.items);
  const selectedItems = useSelector((state) => state.sessions.selectedItems);
  const page = useSelector((state) => state.sessions.page);
  const limit = useSelector((state) => state.sessions.limit);
  const totalCount = useSelector((state) => state.sessions.totalCount);
  const status = useSelector((state) => state.sessions.status);
  const search = useSelector((state) => state.filter.search);
  const usePagination = useSelector((state) => state.filter.usePagination);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  const values = [
    'id',
    'date_start',
    'date_end',
    'code',
    'id_presentation',
    'presentation.name',
    'session_users.length',
  ];
  const headers = [
    'id',
    'Дата начала',
    'Дата окончания',
    'Код',
    'id презентации',
    'Название презентации',
    'Количество пользователей',
  ];

  useEffect(() => {
    dispatch(
      getSessions({
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
      })
    );
  }, [usePagination, page, sortBy, sortType, search]);

  const handleCheckboxClick = () => {
    if (selectedItems.length !== sessions.length) {
      dispatch(setSelectedItems(sessions));
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
              setPage={(item) => dispatch(setSessionsPage(item))}
            />
          )}
        </Header>
        {status === 'succeeded' ? (
          <>
            <Table
              name={'Сессии'}
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
              /* checked={selectedItems.length === sessions.length}
              onSelect={handleCheckboxClick} */
              showCheckbox={false}
            >
              {sessions.map((item) => (
                <TableRow
                  key={item.id}
                  values={values}
                  showCheckbox={false}
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

export default Sessions;
