import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  getNotification,
  editNotification,
  removeNotifications,
} from '../../redux/slices/notificationsSlice';
import { NOTIFICATIONS_ROUTE } from '../../utils/consts';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import Button from '../../components/Button';
import styles from './Notification.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';

const Notification = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifications.notification);
  const status = useSelector((state) => state.notifications.status);

  useEffect(() => {
    dispatch(getNotification({ id }));
  }, [status]);

  useEffect(() => {
    if (
      status === 'succeeded' &&
      notification.date_start &&
      notification.date_end
    ) {
      setData([
        {
          propName: 'id',
          name: 'id',
          value: notification.id,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'name',
          name: 'Название',
          value: notification.name,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'description',
          name: 'Описание',
          value: notification.description,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'priority',
          name: 'Приоритет',
          value: notification.priority,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'date_start',
          name: 'Дата начала',
          value: notification.date_start,
          disabled: false,
          type: 'datetime-local',
        },
        {
          propName: 'date_end',
          name: 'Дата окончания',
          value: notification.date_end,
          disabled: false,
          type: 'datetime-local',
        },
        {
          propName: 'id_currency',
          name: 'id валюты',
          value: notification.id_currency,
          disabled: true,
          type: 'text',
        },
        {
          propName: 'page',
          name: 'Страница',
          value: notification.page,
          disabled: false,
          type: 'text',
        },
      ]);
    }
  }, [status, notification.date_end, notification.date_start]);

  const deleteNotifications = (notifications) => {
    dispatch(removeNotifications(notifications));
  };

  const edit = (editingIndex) => {
    dispatch(
      editNotification({
        id,
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
                deleteNotifications({ notifications: [notification] });
                navigate(NOTIFICATIONS_ROUTE);
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
          {status === 'succeeded' ? (
            <InformationBlock
              data={data}
              setData={setData}
              notification={notification}
              edit={edit}
            />
          ) : (
            <div className={styles.informationBlockLoading}>
              <BsArrowClockwise className={styles.loadingIcon} size={75} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
