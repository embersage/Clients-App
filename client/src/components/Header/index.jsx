import { useSelector, useDispatch } from 'react-redux';
import { RxHamburgerMenu } from 'react-icons/rx';
import { setIsOpened } from '../../redux/slices/menuSlice';
import styles from './Header.module.scss';

const Header = (props) => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <RxHamburgerMenu
        size={50}
        className={styles.menuButton}
        onClick={() => {
          dispatch(setIsOpened(!isOpened));
        }}
      />
      {props.children}
    </header>
  );
};

export default Header;
