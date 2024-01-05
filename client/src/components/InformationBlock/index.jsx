import { useDispatch } from 'react-redux';
import styles from './InformationBlock.module.scss';
import formatDate from '../../utils/formatDate';
import { useEffect, useRef, useState } from 'react';
import { editUser } from '../../redux/slices/usersSlice';

const InformationBlock = (props) => {
  const [data, setData] = useState([
    {
      name: 'id',
      value: props.id,
      disabled: true,
      type: 'text',
    },
    {
      propName: 'name',
      name: 'Имя',
      value: props.name,
      disabled: false,
      type: 'text',
    },
    {
      propName: 'email',
      name: 'Email',
      value: props.email,
      disabled: false,
      type: 'email',
    },
    {
      propName: 'password',
      name: 'Пароль',
      value: props.password,
      disabled: false,
      type: 'text',
    },
    {
      propName: 'activate',
      name: 'Активирован',
      value: props.activate,
      disabled: false,
      type: 'text',
    },
    {
      name: 'Код активации',
      value: props.activate_code,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Дата регистрации',
      value: formatDate(props.date_reg),
      disabled: true,
      type: 'text',
    },
    {
      propName: 'phone',
      name: 'Номер телефона',
      value: props.phone,
      disabled: false,
      type: 'tel',
    },
    {
      name: 'VK',
      value: props.vk,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Yandex',
      value: props.yandex,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Временный',
      value: props.temporary,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Последняя активность',
      value: formatDate(props.date_last_login),
      disabled: true,
      type: 'text',
    },
    {
      name: 'Email статус',
      value: props.email_status,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Компания',
      value: props?.company?.name,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Уровень доступа',
      value: props?.access_level?.name,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Язык',
      value: props?.user_config?.language,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Формат использования',
      value: props?.user_config?.usage_format,
      disabled: true,
      type: 'text',
    },
    {
      name: 'Автоплатеж',
      value: props?.user_config?.auto_payment,
      disabled: true,
      type: 'text',
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onClickHandle = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
  };

  const onChangeHandle = (event, item) => {
    setData(
      data.map((object) => {
        return item.name === object.name
          ? { ...object, value: event.target.value }
          : object;
      })
    );
  };

  return (
    <div className={styles.informationBlock}>
      <h2>Данные</h2>
      <form className={styles.data}>
        {data.map((item, index) => {
          return (
            <label key={index}>
              <span>{item.name}</span>
              {isEditing && editingIndex === index ? (
                <input
                  ref={inputRef}
                  type={item.type}
                  value={item.value ? item.value : ''}
                  placeholder={!item.value ? 'Нет данных' : ''}
                  disabled={item.disabled}
                  onChange={(event) => {
                    onChangeHandle(event, item);
                  }}
                />
              ) : (
                <span
                  onClick={() => {
                    if (!item.disabled) {
                      onClickHandle(index);
                    }
                  }}
                >
                  {item.value ? `${item.value}` : 'Нет данных'}
                </span>
              )}
            </label>
          );
        })}
        {isEditing && (
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              setIsEditing(false);
              setEditingIndex(null);
              dispatch(
                editUser({
                  id: data[0].value,
                  data: {
                    [data[editingIndex].propName]: data[editingIndex].value,
                  },
                })
              );
            }}
          >
            Сохранить
          </button>
        )}
      </form>
    </div>
  );
};

export default InformationBlock;
