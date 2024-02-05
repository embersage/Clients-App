import { Link, useLocation } from 'react-router-dom';
import { BiStats } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { PiNotificationLight } from 'react-icons/pi';
import { LiaRubleSignSolid } from 'react-icons/lia';
import { BsTextParagraph } from 'react-icons/bs';
import { RiComputerLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../../redux/slices/userSlice';
import { setSortBy, setSortType } from '../../redux/slices/filterSlice';
import Button from '../Button';
import styles from './Menu.module.scss';

const Menu = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.menu.isOpened);

  const pages = [
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
      link: '/sessions',
      icon: <RiComputerLine size={30} color="rgba(171,171,171, 0.75)" />,
      name: 'Сессии',
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
          {pages.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.link}
                  {...(item.link === '/login' && {
                    onClick: () => {
                      dispatch(setUser({}));
                      dispatch(setIsAuth(false));
                      localStorage.clear();
                    },
                  })}
                  onClick={() => {
                    dispatch(setSortBy(''));
                    dispatch(setSortType(''));
                  }}
                >
                  <Button
                    isActive={
                      location.pathname === `${item.link}` ? 'true' : 'false'
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
