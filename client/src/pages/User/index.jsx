import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PiArrowsClockwise } from 'react-icons/pi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { setSortBy, setSortType } from '../../redux/slices/filterSlice';
import {
  addSelectedPresentation,
  getUser,
  editUser,
  removeSelectedPresentation,
  removeUsers,
  setSelectedPresentations,
} from '../../redux/slices/usersSlice';
import { USERS_ROUTE } from '../../utils/consts';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import TariffBlock from '../../components/TariffBlock';
import Button from '../../components/Button';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import styles from './User.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.users.user);
  const status = useSelector((state) => state.users.status);
  const selectedPresentations = useSelector(
    (state) => state.users.selectedPresentations
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);
  const [clickedHeader, setClickedHeader] = useState();
  const [data, setData] = useState([]);
  const values = ['id', 'name', 'description'];
  const headers = ['id', 'Название', 'Описание'];

  useEffect(() => {
    dispatch(getUser({ id, sortBy, sortType }));
  }, [sortBy, sortType]);

  useEffect(() => {
    if (status === 'succeeded') {
      setData([
        {
          propName: 'id',
          name: 'id',
          value: user.id,
          disabled: true,
          type: 'number',
        },
        {
          propName: 'name',
          name: 'Имя',
          value: user.name,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'email',
          name: 'Email',
          value: user.email,
          disabled: false,
          type: 'email',
        },
        {
          propName: 'password',
          name: 'Пароль',
          value: '',
          disabled: false,
          type: 'text',
        },
        {
          propName: 'activate',
          name: 'Активирован',
          value: user.activate,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'activate_code',
          name: 'Код активации',
          value: user.activate_code,
          disabled: true,
          type: 'number',
        },
        {
          propName: 'date_reg',
          name: 'Дата регистрации',
          value: user.date_reg,
          disabled: true,
          type: 'datetime-local',
        },
        {
          propName: 'phone',
          name: 'Номер телефона',
          value: user.phone,
          disabled: false,
          type: 'tel',
        },
        {
          propName: 'vk',
          name: 'VK',
          value: user.vk,
          disabled: true,
          type: 'number',
        },
        {
          propName: 'yandex',
          name: 'Yandex',
          value: user.yandex,
          disabled: true,
          type: 'number',
        },
        {
          propName: 'temporary',
          name: 'Временный',
          value: user.temporary,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'date_last_login',
          name: 'Последняя активность',
          value: user.date_last_login,
          disabled: true,
          type: 'datetime-local',
        },
        {
          propName: 'email_status',
          name: 'Email статус',
          value: user.email_status,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'company.name',
          name: 'Компания',
          value: user.company?.name,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'access_level.name',
          name: 'Уровень доступа',
          value: user.access_level?.name,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'user_config.language',
          name: 'Язык',
          value: user.user_config?.language,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'user_config.usage_format',
          name: 'Формат использования',
          value: user.user_config?.usage_format,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'user_config.auto_payment',
          name: 'Автоплатеж',
          value: user.user_config?.auto_payment,
          disabled: true,
          type: 'text',
        },
      ]);
    }
  }, [status]);

  const deleteUsers = async (users) => {
    await dispatch(removeUsers(users));
  };

  const handleCheckboxClick = () => {
    if (selectedPresentations.length !== user.presentations.length) {
      dispatch(setSelectedPresentations(user.presentations));
    } else {
      dispatch(setSelectedPresentations([]));
    }
  };

  const edit = (editingIndex) => {
    dispatch(
      editUser({
        id: data[0].value,
        data: {
          [data[editingIndex].propName]: data[editingIndex].value,
        },
      })
    );
  };

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header>
          <div className={headerStyles.buttons}>
            <Button
              onClick={(event) => {
                event.preventDefault();
                deleteUsers({ users: [user] });
                navigate(USERS_ROUTE);
              }}
            >
              <AiOutlineDelete
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Удалить</span>
            </Button>
          </div>
        </Header>
        <div className={styles.content}>
          {data.length > 0 ? (
            <>
              <InformationBlock
                data={data}
                setData={setData}
                user={user}
                edit={edit}
              />
              <div className={styles.additionalInfo}>
                {user.payment_infos && user.payment_infos.length > 0 ? (
                  <TariffBlock payment_infos={user.payment_infos} />
                ) : (
                  <div className={styles.loadingBanner}>
                    <span>Нет действующего тарифа ☹️</span>
                  </div>
                )}
                <>
                  {user.presentations && user.presentations.length ? (
                    <Table
                      name={'Презентации'}
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
                        selectedPresentations.length ===
                        user.presentations.length
                      }
                      onSelect={handleCheckboxClick}
                      showCheckbox={false}
                    >
                      {user.presentations.map((item) => (
                        <TableRow
                          key={item.id}
                          values={values}
                          showCheckbox={false}
                        >
                          {item}
                        </TableRow>
                      ))}
                    </Table>
                  ) : (
                    <div className={styles.loadingBanner}>
                      <span>Нет презентаций ☹️</span>
                    </div>
                  )}
                </>
              </div>
            </>
          ) : (
            <>
              <div className={styles.loadingBanner}>
                <PiArrowsClockwise className={styles.loadingIcon} size={75} />
              </div>
              <div className={styles.additionalInfo}>
                <div className={styles.loadingBanner}>
                  <PiArrowsClockwise className={styles.loadingIcon} size={75} />
                </div>
                <div className={styles.loadingBanner}>
                  <PiArrowsClockwise className={styles.loadingIcon} size={75} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
