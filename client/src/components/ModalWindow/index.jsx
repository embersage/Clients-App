import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { setIsVisible } from '../../redux/slices/modalSlice';
import styles from './ModalWindow.module.scss';

const ModalWindow = (props) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const isVisible = useSelector((state) => state.modal.isVisible);

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
          {props.children}
        </div>
      </>
    );
  }
};

export default ModalWindow;
