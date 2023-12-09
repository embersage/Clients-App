import { Link, useLocation } from 'react-router-dom';
import { BiStats } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { LiaRubleSignSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../../redux/slices/userSlice';
import Button from '../Button';
import styles from './Menu.module.scss';

const Menu = () => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const location = useLocation();
  const dispatch = useDispatch();

  if (isOpened) {
    return (
      <nav className={styles.menu}>
        <ul className={styles.pages}>
          <li>
            <Link to="/">
              <Button isActive={location.pathname === '/' ? `true` : 'false'}>
                <BiStats size={30} color="rgba(171,171,171, 0.75)" />
                <span>Главная</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <Button
                isActive={location.pathname === '/users' ? `true` : 'false'}
              >
                <GoPeople size={30} color="rgba(171,171,171, 0.75)" />
                <span>Клиенты</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/mail">
              <Button
                isActive={location.pathname === '/mail' ? `true` : 'false'}
              >
                <SlEnvolopeLetter size={30} color="rgba(171,171,171, 0.75)" />
                <span>Рассылка</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/payments">
              <Button
                isActive={location.pathname === '/payments' ? `true` : 'false'}
              >
                <LiaRubleSignSolid size={30} color="rgba(171,171,171, 0.75)" />
                <span>Операции</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setUser({}));
                dispatch(setIsAuth(false));
                localStorage.clear();
              }}
            >
              <Button
                isActive={location.pathname === '/login' ? `true` : 'false'}
              >
                <CiLogout size={30} color="rgba(171,171,171, 0.75)" />
                <span>Выход</span>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Menu;
