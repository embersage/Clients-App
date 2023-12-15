import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import { setIsVisible } from '../../redux/slices/modalSlice';
import styles from './ModalWindow.module.scss';

const ModalWindow = (props) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const { name, email, password, number, role, company, accessLevel } = props;
  const isVisible = useSelector((state) => state.modal.isVisible);
  const [data, setData] = useState({
    name,
    email,
    password,
    number,
    role,
    company,
    accessLevel,
  });

  if (isVisible) {
    return (
      <>
        <div
          className={styles.darkBackground}
          onClick={() => {
            dispatch(setIsVisible(false));
          }}
        />
        <form className={styles.content}>
          <label>
            <span>Файл</span>
            <input type="file" />
          </label>
        </form>
        <div className={styles.modalWindow} ref={modalRef}></div>
      </>
    );
  }
};

export default ModalWindow;

//<form className={styles.content}>
//  <h2>Редактирование данных</h2>
//  <label>
//    <span>Имя: </span>
//    <input
//      value={data.name}
//      onChange={(event) => {
//        setData(event.target.value);
//      }}
//    />
//  </label>
//  <label>
//    <span>Email: </span>
//    <input
//      value={data.email}
//      onChange={(event) => {
//        setData(event.target.value);
//      }}
//    />
//  </label>
//  <label>
//    <span>Пароль: </span>
//    <input
//      value={data.password}
//      onChange={(event) => {
//        setData(event.target.value);
//      }}
//    />
//  </label>
//  <label>
//    <span>Номер телефона: </span>
//    <input
//      value={data.number}
//      onChange={(event) => {
//        setData(event.target.value);
//      }}
//    />
//  </label>
//  <label>
//    <span>Роль: </span>
//    <input
//      value={data.role}
//      onChange={(event) => {
//        setData(event.target.value);
//      }}
//    />
//  </label>
//  <label>
//    <span>Компания: </span>
//    <input
//      value={data.company}
//      onChange={(event) => {
//        setData(event.target.value);
//      }}
//    />
//  </label>
//  <label>
//    <span>Уровень доступа: </span>
//    <input
//      value={data.accessLevel}
//      onChange={(event) => {
//        setData(event.target.value);
//      }}
//    />
//  </label>
//  <button
//    type="submit"
//    onClick={(event) => {
//      event.preventDefault();
//    }}
//  >
//    Изменить
//  </button>
//</form>
