import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsArrowClockwise } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiImport } from 'react-icons/ci';
import { MdFilterAlt } from 'react-icons/md';
import {
  getUsers,
  setSelectedUsers,
  addSelectedUser,
  removeSelectedUser,
  importUsers,
  removeUsers,
} from '../../redux/slices/usersSlice';
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
  const [allAreSelected, setAllAreSelected] = useState(false);
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
    'access_level.name',
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getUsers({ limit: 10, page, search }));
    };
    fetchUsers();

    setAllAreSelected(false);
  }, [search, page]);

  const upload = async (file) => {
    const response = await dispatch(importUsers(file));
    if (response.payload) {
      dispatch(getUsers({ limit: 10, page, search }));
      dispatch(setIsVisible(false));
    } else {
      console.log('error');
    }
  };

  const deleteUsers = async (users) => {
    await dispatch(removeUsers(users));
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
              headers={[
                '',
                'id',
                'Имя',
                'Email',
                'Активирован',
                'Дата регистрации',
                'Номер телефона',
                'Временный',
                'Последняя активность',
                'Компания',
                'Уровень доступа',
              ]}
              name={'Клиенты'}
              checked={selectedUsers.length === users.length ? true : false}
              allAreSelected={allAreSelected}
              /* onSelect={() => {
                dispatch(setSelectedUsers(users));
                setAllAreSelected(true);
              }}
              onUnselect={() => {
                dispatch(setSelectedUsers([]));
                setAllAreSelected(false);
              }} */
              onSelect={() => {
                if (selectedUsers.length !== users.length) {
                  dispatch(setSelectedUsers(users));
                  setAllAreSelected(true);
                } else {
                  dispatch(setSelectedUsers([]));
                  setAllAreSelected(false);
                }
              }}
            >
              {users.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    dispatch(setSelectedUsers([item]));
                    navigate(`/user/${item.id}`);
                  }}
                  values={values}
                  showCheckbox={true}
                  onSelect={() => {
                    dispatch(addSelectedUser(item));
                  }}
                  onUnselect={() => {
                    dispatch(removeSelectedUser(item));
                  }}
                  allAreSelected={allAreSelected}
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
                <span>Фильтры</span>
              </label>
            </>
          )}
        </form>
      </ModalWindow>
    </>
  );
};

export default Users;
