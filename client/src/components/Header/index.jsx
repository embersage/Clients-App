import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { setIsOpened } from '../../redux/slices/menuSlice';
import styles from './Header.module.scss';

const Header = (props) => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      {isOpened ? (
        <FiChevronLeft
          size={50}
          className={styles.menuButton}
          onClick={() => {
            dispatch(setIsOpened(!isOpened));
          }}
        />
      ) : (
        <FiChevronRight
          size={50}
          className={styles.menuButton}
          onClick={() => {
            dispatch(setIsOpened(!isOpened));
          }}
        />
      )}
      {props.children}
    </header>
  );
};

export default Header;
