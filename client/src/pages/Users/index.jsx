import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsArrowClockwise } from 'react-icons/bs';
import { getUsers, importUsers } from '../../redux/slices/usersSlice';
import { setIsVisible } from '../../redux/slices/modalSlice';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import ModalWindow from '../../components/ModalWindow';
import styles from './Users.module.scss';
import modalStyles from '../../components/ModalWindow/ModalWindow.module.scss';

const Users = () => {
  const inputRef = useRef();
  const users = useSelector((state) => state.users.items);
  const page = useSelector((state) => state.users.page);
  const status = useSelector((state) => state.users.status);
  const search = useSelector((state) => state.filter.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      await dispatch(getUsers({ name: search, limit: 10, page }));
    };

    fetchUsers();
  }, [search, page]);

  const upload = async (file) => {
    const response = await dispatch(importUsers(file));
    if (response.payload) {
      dispatch(getUsers({ name: search, limit: 10, page }));
      dispatch(setIsVisible(false));
    } else {
      console.log('error');
    }
  };

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header />
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
              caption={'Клиенты'}
            >
              {users.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    navigate(`/user/${item.id}`);
                  }}
                  values={values}
                  showCheckbox={true}
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
        </form>
      </ModalWindow>
    </>
  );
};

export default Users;
