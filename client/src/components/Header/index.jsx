import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { setIsOpened } from '../../redux/slices/menuSlice';
import { setIsVisible } from '../../redux/slices/modalSlice';
import Search from '../../components/Search';
import Pagination from '../Pagination';
import styles from './Header.module.scss';
import Button from '../Button';

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

//<button
//            className={styles.changeButton}
//            onClick={() => {
//              dispatch(setIsVisible(true));
//            }}
//          >
//            <CiEdit size={30} />
//            Изменить
//          </button>
//          <button className={styles.deleteButton}>
//            <AiOutlineDelete size={30} />
//            Удалить
//          </button>
