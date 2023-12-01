import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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

  //useEffect(() => {
  //  const clickOutside = (event) => {
  //    if (!event.composedPath().includes(modalRef.current)) {
  //      console.log(1);
  //      //dispatch(setIsVisible(false));
  //    }
  //  };
  //
  //  document.body.addEventListener('click', clickOutside);
  //
  //  return () => {
  //    document.body.removeEventListener('click', clickOutside);
  //  };
  //}, []);

  if (isVisible) {
    return (
      <>
        <div
          className={styles.darkBackground}
          onClick={() => {
            dispatch(setIsVisible(false));
          }}
        />
        <div className={styles.modalWindow} ref={modalRef}>
          <form>
            <label>
              <input
                value={data.name}
                onChange={(event) => {
                  setData(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                value={data.email}
                onChange={(event) => {
                  setData(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                value={data.password}
                onChange={(event) => {
                  setData(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                value={data.number}
                onChange={(event) => {
                  setData(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                value={data.role}
                onChange={(event) => {
                  setData(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                value={data.company}
                onChange={(event) => {
                  setData(event.target.value);
                }}
              />
            </label>
            <label>
              <input
                value={data.accessLevel}
                onChange={(event) => {
                  setData(event.target.value);
                }}
              />
            </label>
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              Войти
            </button>
          </form>
        </div>
      </>
    );
  }
};

export default ModalWindow;
