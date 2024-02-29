import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditingIndex,
  setIsEditing,
  setIsVisible,
  setPressedButton,
} from '../../redux/slices/modalSlice';
import styles from './ModalWindow.module.scss';

const ModalWindow = memo((props) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.modal.isVisible);

  if (isVisible) {
    return (
      <>
        <div
          className={styles.darkBackground}
          onClick={() => {
            dispatch(setIsVisible(false));
            dispatch(setPressedButton(''));
            dispatch(setIsEditing(false));
            dispatch(setEditingIndex(null));
          }}
        />
        <div className={styles.modalWindow}>{props.children}</div>
      </>
    );
  }
});

export default ModalWindow;
