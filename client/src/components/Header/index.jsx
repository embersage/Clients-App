import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiImport } from 'react-icons/ci';
import { MdFilterAlt } from 'react-icons/md';
import { setIsOpened } from '../../redux/slices/menuSlice';
import { setIsVisible, setPressedButton } from '../../redux/slices/modalSlice';
import Search from '../../components/Search';
import Pagination from '../Pagination';
import Button from '../Button';
import { removeUsers } from '../../redux/slices/usersSlice';
import styles from './Header.module.scss';

const Header = () => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const selectedUsers = useSelector((state) => state.users.selectedUsers);
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
      {(location.pathname.includes('/users') ||
        location.pathname.includes('/payments')) && <Search />}
      <div className={styles.buttons}>
        {(location.pathname.includes('/users') ||
          location.pathname.includes('/payments')) && (
          <Button
            onClick={() => {
              dispatch(setIsVisible(true));
              dispatch(setPressedButton('filters'));
            }}
          >
            <MdFilterAlt
              size={30}
              className={styles.icon}
              color="rgba(171,171,171, 0.75)"
            />
            <span>Фильтры</span>
          </Button>
        )}
        {(location.pathname.includes('/user/') ||
          (location.pathname.includes('/users') &&
            selectedUsers.length > 0)) && (
          <Button
            onClick={() => {
              if (location.pathname.includes('/users')) {
                console.log('selectedUsers in button:', selectedUsers);
                dispatch(removeUsers({ users: selectedUsers }));
              }
            }}
          >
            <AiOutlineDelete
              size={30}
              className={styles.icon}
              color="rgba(171,171,171, 0.75)"
            />
            <span>Удалить</span>
          </Button>
        )}
        {location.pathname.includes('/users') && (
          <Button
            onClick={() => {
              dispatch(setIsVisible(true));
              dispatch(setPressedButton('import'));
            }}
          >
            <CiImport
              size={30}
              className={styles.icon}
              color="rgba(171,171,171, 0.75)"
            />
            <span>Импорт</span>
          </Button>
        )}
      </div>
      {(location.pathname.includes('/users') ||
        location.pathname.includes('/payments')) && <Pagination />}
    </header>
  );
};

export default Header;
