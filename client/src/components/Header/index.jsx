import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { setIsOpened } from '../../redux/slices/menuSlice';
import Search from '../../components/Search';
import Pagination from '../Pagination';
import styles from './Header.module.scss';

const Header = () => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const dispatch = useDispatch();
  const location = useLocation();

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
      {location.pathname.includes('/users') && <Search />}
      {location.pathname.includes('/users') && <Pagination />}
    </header>
  );
};

export default Header;
