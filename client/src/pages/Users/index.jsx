import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PiArrowsClockwise } from 'react-icons/pi';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiImport } from 'react-icons/ci';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import {
  getUsers,
  setSelectedUsers,
  addSelectedUser,
  removeSelectedUser,
  importUsers,
  removeUsers,
  setUser,
  setUsersPage,
} from '../../redux/slices/usersSlice';
import {
  setUsePagination,
  setAutoPayment,
  setHasFreeTariff,
  setHasSubscription,
  setActivate,
  setEndSoon,
  setSortBy,
  setSortType,
} from '../../redux/slices/filterSlice';
import { setIsVisible, setPressedButton } from '../../redux/slices/modalSlice';
import {
  setName,
  setTemplate,
  addVariable,
  removeVariable,
} from '../../redux/slices/emailSlice';
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
  const [clickedHeader, setClickedHeader] = useState();
  const [emailName, setEmailName] = useState();
  const [templateId, setTemplateId] = useState();
  const users = useSelector((state) => state.users.users);
  const selectedUsers = useSelector((state) => state.users.selectedUsers);
  const page = useSelector((state) => state.users.page);
  const totalCount = useSelector((state) => state.users.totalCount);
  const limit = useSelector((state) => state.users.limit);
  const status = useSelector((state) => state.users.status);
  const search = useSelector((state) => state.filter.search);
  const autoPayment = useSelector((state) => state.filter.autoPayment);
  const hasFreeTariff = useSelector((state) => state.filter.hasFreeTariff);
  const hasSubscription = useSelector((state) => state.filter.hasSubscription);
  const activate = useSelector((state) => state.filter.activate);
  const endSoon = useSelector((state) => state.filter.endSoon);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);
  const usePagination = useSelector((state) => state.filter.usePagination);
  const pressedButton = useSelector((state) => state.modal.pressedButton);
  const name = useSelector((state) => state.email.name);
  const template = useSelector((state) => state.email.template);
  const variables = useSelector((state) => state.email.variables);
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
  ];

  useEffect(() => {
    dispatch(
      getUsers({
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
        activate,
        endSoon,
        autoPayment,
        hasFreeTariff,
        hasSubscription,
      })
    );
  }, [
    usePagination,
    page,
    sortBy,
    sortType,
    search,
    activate,
    endSoon,
    autoPayment,
    hasFreeTariff,
    hasSubscription,
  ]);

  const upload = async (file) => {
    const response = await dispatch(importUsers(file));
    if (response.payload) {
      dispatch(
        getUsers({
          usePagination,
          limit: 10,
          page,
          sortBy,
          sortType,
          search,
          activate,
          endSoon,
          autoPayment,
          hasFreeTariff,
          hasSubscription,
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
        usePagination,
        limit: 10,
        page,
        sortBy,
        sortType,
        search,
        activate,
        endSoon,
        autoPayment,
        hasFreeTariff,
        hasSubscription,
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
            {selectedUsers.length > 0 && (
              <>
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
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(setIsVisible(true));
                    dispatch(setPressedButton('email'));
                  }}
                >
                  <MdOutlineMailOutline
                    size={30}
                    className={styles.icon}
                    color="rgba(171,171,171, 0.75)"
                  />
                  <span>Рассылка</span>
                </Button>
              </>
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
          {usePagination && (
            <Pagination
              totalCount={totalCount}
              limit={limit}
              setPage={(item) => dispatch(setUsersPage(item))}
            />
          )}
        </Header>
        {status === 'succeeded' ? (
          <>
            <Table
              page="users"
              name={'Пользователи'}
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
                selectedUsers.length > 0 &&
                users.length > 0 &&
                selectedUsers.length === users.length
              }
              onSelect={handleCheckboxClick}
              showCheckbox={true}
            >
              {users.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    dispatch(setSortBy(''));
                    dispatch(setSortType(''));
                    dispatch(setUser(item));
                    navigate(`/users/${item.id}`);
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
            <PiArrowsClockwise className={styles.loadingIcon} size={75} />
          </div>
        )}
      </div>
      <ModalWindow>
        <form className={modalStyles.content}>
          {pressedButton === 'import' && (
            <>
              <label className={modalStyles.uploadWrapper}>
                <input
                  ref={inputRef}
                  type="file"
                  onChange={() => {
                    console.log(inputRef.current.files.length);
                  }}
                />
                {/* {inputRef.current?.files.length > 0 && ( */}
                <button
                  className={modalStyles.upload}
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    if (inputRef.current.files.length > 0) {
                      upload({ file: inputRef.current.files[0] });
                    }
                  }}
                >
                  Импорт
                </button>
                {/* )} */}
              </label>
            </>
          )}
          {pressedButton === 'email' && (
            <>
              <label>
                <input
                  placeholder="Название рассылки"
                  onChange={(event) => {
                    setEmailName(event.target.value);
                  }}
                  value={emailName}
                />
              </label>
              <label>
                <input
                  placeholder="ID шаблона"
                  onChange={(event) => {
                    setTemplateId(event.target.value);
                  }}
                  value={templateId}
                />
              </label>
              {variables.map((item, index) => {
                return (
                  <div className={modalStyles.variables} key={index}>
                    <input placeholder="Code" />
                    <input placeholder="Value" />
                  </div>
                );
              })}
              <button
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(addVariable());
                }}
              >
                Добавить переменную
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                }}
                type="submit"
              >
                Отправить
              </button>
            </>
          )}
          {pressedButton === 'filters' && (
            <>
              <h2>Фильтры</h2>
              <label className={modalStyles.inputWrapper}>
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
                  checked={activate}
                />
              </label>
              <label className={modalStyles.inputWrapper}>
                <span>Бесплатный тариф</span>
                <input
                  type="checkbox"
                  onChange={() => {
                    if (!hasFreeTariff) {
                      dispatch(setHasFreeTariff(true));
                    } else {
                      dispatch(setHasFreeTariff(false));
                    }
                  }}
                  checked={hasFreeTariff}
                />
              </label>
              <label className={modalStyles.inputWrapper}>
                <span>Скоро закончится тариф</span>
                <input
                  type="checkbox"
                  onChange={() => {
                    if (!endSoon) {
                      dispatch(setEndSoon(true));
                    } else {
                      dispatch(setEndSoon(false));
                    }
                  }}
                  checked={endSoon}
                />
              </label>
              <label className={modalStyles.inputWrapper}>
                <span>Есть подписка</span>
                <input
                  type="checkbox"
                  onChange={() => {
                    if (!hasSubscription) {
                      dispatch(setHasSubscription(true));
                    } else {
                      dispatch(setHasSubscription(false));
                    }
                  }}
                  checked={hasSubscription}
                />
              </label>
              <label className={modalStyles.inputWrapper}>
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
                  checked={autoPayment}
                />
              </label>
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
        </form>
      </ModalWindow>
    </>
  );
};

export default Users;
