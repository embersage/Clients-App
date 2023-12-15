import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiImport } from 'react-icons/ci';
import { setIsOpened } from '../../redux/slices/menuSlice';
import { setIsVisible } from '../../redux/slices/modalSlice';
import Search from '../../components/Search';
import Pagination from '../Pagination';
import Button from '../Button';
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
      {location.pathname.includes('/users') && (
        <Button className={styles.button} onClick={() => {}}>
          <CiImport
            size={30}
            className={styles.icon}
            color="rgba(171,171,171, 0.75)"
          />
          <span>Импорт</span>
        </Button>
      )}
      {location.pathname.includes('/users') && <Search />}
      {(location.pathname.includes('/users') ||
        location.pathname.includes('/payments')) && <Pagination />}
      {location.pathname.includes('/user/') && (
        <div className={styles.buttons}>
          <Button
            onClick={() => {
              dispatch(setIsVisible(true));
            }}
          >
            <CiEdit
              size={30}
              className={styles.icon}
              color="rgba(171,171,171, 0.75)"
            />
            <span>Изменить</span>
          </Button>
          <Button
            onClick={() => {
              console.log(1);
            }}
          >
            <AiOutlineDelete
              size={30}
              className={styles.icon}
              color="rgba(171,171,171, 0.75)"
            />
            <span>Удалить</span>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
