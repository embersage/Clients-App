import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { setIsOpened } from '../../redux/slices/menuSlice';
import Search from '../../components/Search';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';

const Header = () => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const dispatch = useDispatch();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000 * 60);
  }, [time]);

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
      <Search />
      <Pagination/>
      
    </header>
  );
};

export default Header;