import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { setIsOpened } from '../../redux/slices/menuSlice';
import Search from '../../components/Search';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

const Header = () => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const dispatch = useDispatch();
  const date = new Date();
  //const [time, setTime] = useState({
  //  minutes: date.getMinutes(),
  //  hours: date.getHours(),
  //  day: date.getDate(),
  //  month: date.getMonth(),
  //  year: date.getFullYear(),
  //});
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000 * 60);
  }, [time]);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
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
        <p className={styles.time}>
          <span>{`${time.getHours()}:${time.getMinutes()}`}</span>
          <br />
          <span>{`${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`}</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
