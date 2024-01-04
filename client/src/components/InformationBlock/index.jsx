import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import styles from './InformationBlock.module.scss';
import formatDate from '../../utils/formatDate';
import { useState } from 'react';

const InformationBlock = (props) => {
  /* TODO
      language
      usage_format
      auto_payment */
  const [data, setData] = useState([
    { name: 'id', value: props.id, canEdit: false },
    { name: 'Имя', value: props.name, canEdit: true },
    { name: 'Email', value: props.email, canEdit: true },
    { name: 'Пароль', value: props.password, canEdit: true },
    { name: 'Активирован', value: props.activate, canEdit: true },
    { name: 'Код активации', value: props.activate_code, canEdit: false },
    {
      name: 'Дата регистрации',
      value: formatDate(props.date_reg),
      canEdit: false,
    },
    { name: 'Номер телефона', value: props.phone, canEdit: true },
    { name: 'VK', value: props.vk, canEdit: false },
    { name: 'Yandex', value: props.yandex, canEdit: false },
    { name: 'Временный', value: props.temporary, canEdit: false },
    {
      name: 'Последняя активность',
      value: formatDate(props.date_last_login),
      canEdit: false,
    },
    { name: 'Email статус', value: props.email_status, canEdit: false },
    { name: 'Компания', value: props?.company?.name, canEdit: false },
    {
      name: 'Уровень доступа',
      value: props?.access_level?.name,
      canEdit: false,
    },
    {
      name: 'Язык',
      value: props?.user_config?.language,
      canEdit: false,
    },
    {
      name: 'Формат использования',
      value: props?.user_config?.usage_format,
      canEdit: false,
    },
    {
      name: 'Автоплатеж',
      value: `${props?.user_config?.auto_payment}`,
      canEdit: false,
    },
  ]);

  return (
    <div className={styles.informationBlock}>
      <h2>Данные</h2>
      <form className={styles.data}>
        {data.map((item, index) => {
          return (
            <label key={index}>
              <span>{item.name}</span>
              <input
                type="text"
                value={item.value ? item.value : ''}
                placeholder={!item.value ? 'Нет данных' : ''}
                onChange={(event) => {
                  setData(
                    data.map((object) => {
                      return item.name === object.name
                        ? { ...object, value: event.target.value }
                        : object;
                    })
                  );
                  console.log(data);
                }}
              />
            </label>
          );
        })}
      </form>
    </div>
  );
};

export default InformationBlock;
