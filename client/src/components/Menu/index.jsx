import { Link, useLocation } from 'react-router-dom';
import { BiStats } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { PiNotificationLight } from 'react-icons/pi';
import { LiaRubleSignSolid } from 'react-icons/lia';
import { BsTextParagraph } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../../redux/slices/userSlice';
import Button from '../Button';
import styles from './Menu.module.scss';

const Menu = () => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const location = useLocation();
  const dispatch = useDispatch();

  const pages = [
    {
      link: '/',
      icon: <BiStats size={30} color="rgba(171,171,171, 0.75)" />,
      name: 'Главная',
    },
    {
      link: '/users',
      icon: <GoPeople size={30} color="rgba(171,171,171, 0.75)" />,
      name: 'Клиенты',
    },
    {
      link: '/payments',
      icon: <LiaRubleSignSolid size={30} color="rgba(171,171,171, 0.75)" />,
      name: 'Операции',
    },
    {
      link: '/promocodes',
      icon: <BsTextParagraph size={30} color="rgba(171,171,171, 0.75)" />,
      name: 'Промокоды',
    },
    {
      link: '/notifications',
      icon: <PiNotificationLight size={30} color="rgba(171,171,171, 0.75)" />,
      name: 'Уведомления',
    },
    {
      link: '/login',
      icon: <CiLogout size={30} color="rgba(171,171,171, 0.75)" />,
      name: 'Выход',
    },
  ];

  if (isOpened) {
    return (
      <nav className={styles.menu}>
        <ul className={styles.pages}>
          {pages.map((item) => {
            return (
              <li>
                <Link
                  to={item.link}
                  {...(item.link === '/login' && {
                    onClick: () => {
                      dispatch(setUser({}));
                      dispatch(setIsAuth(false));
                      localStorage.clear();
                    },
                  })}
                >
                  <Button
                    isActive={
                      location.pathname === `${item.link}` ? `true` : 'false'
                    }
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
};

export default Menu;

{
  /* <li>
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
            <Link to="/promocodes">
              <Button
                isActive={
                  location.pathname === '/promocodes' ? `true` : 'false'
                }
              >
                <BsTextParagraph size={30} color="rgba(171,171,171, 0.75)" />
                <span>Промокоды</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <Button
                isActive={
                  location.pathname === '/notifications' ? `true` : 'false'
                }
              >
                <PiNotificationLight
                  size={30}
                  color="rgba(171,171,171, 0.75)"
                />
                <span>Уведомления</span>
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
          </li> */
}
