import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineMenu } from 'react-icons/hi';
import { setIsOpened } from '../../redux/slices/menuSlice';
import styles from './Header.module.scss';

const Header = (props) => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <HiOutlineMenu
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
