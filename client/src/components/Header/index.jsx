import { useSelector, useDispatch } from 'react-redux';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { setIsOpened } from '../../redux/slices/menuSlice';
import styles from './Header.module.scss';

const Header = () => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {isOpened ? (
          <RiMenuFoldLine
            size={30}
            className={styles.menuButton}
            onClick={() => {
              dispatch(setIsOpened(!isOpened));
            }}
          />
        ) : (
          <RiMenuUnfoldLine
            size={30}
            className={styles.menuButton}
            onClick={() => {
              dispatch(setIsOpened(!isOpened));
            }}
          />
        )}

        <h1>Header</h1>
      </div>
    </header>
  );
};

export default Header;
