import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { MdFilterAlt } from 'react-icons/md';
import {
  getPromocodes,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
} from '../../redux/slices/promocodesSlice';
import { setUsePagination } from '../../redux/slices/filterSlice';
import { setIsVisible, setPressedButton } from '../../redux/slices/modalSlice';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import ModalWindow from '../../components/ModalWindow';
import Pagination from '../../components/Pagination';
import Button from '../../components/Button';
import Search from '../../components/Search';
import styles from './Promocodes.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';

const Promocodes = () => {
  const dispatch = useDispatch();
  const promocodes = useSelector((state) => state.promocodes.items);
  const selectedItems = useSelector((state) => state.promocodes.selectedItems);
  const page = useSelector((state) => state.promocodes.page);
  const status = useSelector((state) => state.promocodes.status);
  const search = useSelector((state) => state.filter.search);
  const usePagination = useSelector((state) => state.filter.usePagination);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  const values = ['id', 'code', 'discount', 'date_start', 'date_end'];
  const headers = ['id', 'Код', 'Скидка', 'Дата начала', 'Дата окончания'];

  useEffect(() => {
    const fetchPromocodes = async () => {
      await dispatch(getPromocodes({ limit: 10, page, name: search }));
    };
    fetchPromocodes();
  }, [search, page]);

  const handleCheckboxClick = () => {
    if (selectedItems.length !== promocodes.length) {
      dispatch(setSelectedItems(promocodes));
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
          {usePagination && <Pagination />}
        </Header>
        {status === 'succeeded' ? (
          <>
            <Table
              name={'Промокоды'}
              headers={headers}
              values={values}
              checked={selectedItems.length === promocodes.length}
              onSelect={handleCheckboxClick}
            >
              {promocodes.map((item) => (
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

export default Promocodes;
