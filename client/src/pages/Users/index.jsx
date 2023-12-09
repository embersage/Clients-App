import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { getUsers } from '../../redux/slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Users.module.scss';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';

const Users = () => {
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
    'vk',
    'yandex',
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

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header />
        {status === 'succeeded' ? (
          <>
            <Table
              headers={[
                'id',
                'Имя',
                'Email',
                'Активирован',
                'Дата регистрации',
                'Номер телефона',
                'VK',
                'Yandex',
                'Временный',
                'Последняя активность',
                'Компания',
                'Уровень доступа',
              ]}
            >
              {users.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    navigate(`/user/${item.id}`);
                  }}
                  values={values}
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
    </>
  );
};

export default Users;
