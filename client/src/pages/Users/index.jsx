import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsArrowClockwise } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiImport } from 'react-icons/ci';
import { MdFilterAlt } from 'react-icons/md';
import { IoIosArrowRoundDown } from 'react-icons/io';
import { IoIosArrowRoundUp } from 'react-icons/io';
import {
  getUsers,
  setSelectedUsers,
  addSelectedUser,
  removeSelectedUser,
  importUsers,
  removeUsers,
  setUser,
} from '../../redux/slices/usersSlice';
import {
  setEndSoon,
  setHasFreeTariff,
  setHasSubscription,
  setAutoPayment,
  setTariff,
  setActivate,
  setSortBy,
  setSortType,
} from '../../redux/slices/filterSlice';
import { setIsVisible, setPressedButton } from '../../redux/slices/modalSlice';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import ModalWindow from '../../components/ModalWindow';
import Search from '../../components/Search';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import styles from './Users.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';

const Users = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const selectedUsers = useSelector((state) => state.users.selectedUsers);
  const page = useSelector((state) => state.users.page);
  const status = useSelector((state) => state.users.status);
  const search = useSelector((state) => state.filter.search);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  const autoPayment = useSelector((state) => state.filter.autoPayment);
  const activate = useSelector((state) => state.filter.activate);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);
  const [clickedHeader, setClickedHeader] = useState();
  const values = [
    'id',
    'name',
    'email',
    'activate',
    'date_reg',
    'phone',
    'temporary',
    'date_last_login',
    'company.name',
    //'access_level.name',
  ];
  const headers = [
    'id',
    'Имя',
    'Email',
    'Активирован',
    'Дата регистрации',
    'Номер телефона',
    'Временный',
    'Последняя активность',
    'Компания',
    //'Уровень доступа',
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(
        getUsers({
          limit: 10,
          page,
          sortBy,
          sortType,
          search,
          activate,
          autoPayment,
        })
      );
    };
    fetchUsers();
  }, [page, sortBy, sortType, search, activate, autoPayment]);

  const upload = async (file) => {
    const response = await dispatch(importUsers(file));
    if (response.payload) {
      dispatch(
        getUsers({
          limit: 10,
          page,
          sortBy,
          sortType,
          search,
          activate,
          autoPayment,
        })
      );
      dispatch(setIsVisible(false));
    } else {
      console.log('error');
    }
  };

  const deleteUsers = async (users) => {
    await dispatch(removeUsers(users));
    await dispatch(
      getUsers({
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
        activate,
        autoPayment,
      })
    );
  };

  const handleCheckboxClick = () => {
    if (selectedUsers.length !== users.length) {
      dispatch(setSelectedUsers(users));
    } else {
      dispatch(setSelectedUsers([]));
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
            {selectedUsers.length > 0 && (
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  deleteUsers({ users: selectedUsers });
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
            <Button
              onClick={() => {
                dispatch(setIsVisible(true));
                dispatch(setPressedButton('import'));
              }}
            >
              <CiImport
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Импорт</span>
            </Button>
          </div>
          <Pagination />
        </Header>
        {status === 'succeeded' ? (
          <>
            <Table
              name={'Клиенты'}
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
              checked={selectedUsers.length === users.length}
              onSelect={handleCheckboxClick}
            >
              {users.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    //dispatch(setSelectedUsers([item]));
                    dispatch(setUser(item));
                    navigate(`/user/${item.id}`);
                  }}
                  values={values}
                  showCheckbox={true}
                  checked={selectedUsers.includes(item)}
                  onSelect={() => {
                    dispatch(addSelectedUser(item));
                  }}
                  onUnselect={() => {
                    dispatch(removeSelectedUser(item));
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
          {pressedButton === 'import' && (
            <>
              <label>
                <span>Файл</span>
                <input ref={inputRef} type="file" />
              </label>
              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  upload({ file: inputRef.current.files[0] });
                }}
              >
                Импорт
              </button>
            </>
          )}
          {pressedButton === 'filters' && (
            <>
              <label>
                <span>Активированный аккаунт</span>
                <input
                  type="checkbox"
                  onChange={() => {
                    if (!activate) {
                      dispatch(setActivate(true));
                    } else {
                      dispatch(setActivate(''));
                    }
                  }}
                />
              </label>
              <label>
                <span>Бесплатный тариф</span>
                <input type="checkbox" />
              </label>
              <label>
                <span>Скоро закончится тариф</span>
                <input type="checkbox" />
              </label>
              <label>
                <span>Есть подписка</span>
                <input type="checkbox" />
              </label>
              <label>
                <span>Включено автопродление</span>
                <input
                  type="checkbox"
                  onChange={() => {
                    if (!autoPayment) {
                      dispatch(setAutoPayment(true));
                    } else {
                      dispatch(setAutoPayment(''));
                    }
                  }}
                />
              </label>
            </>
          )}
        </form>
      </ModalWindow>
    </>
  );
};

export default Users;
