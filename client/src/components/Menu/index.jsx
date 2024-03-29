import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { PiNotificationLight } from 'react-icons/pi';
import { LiaRubleSignSolid } from 'react-icons/lia';
import { BsTextParagraph } from 'react-icons/bs';
import { RiComputerLine } from 'react-icons/ri';
import { MdOutlinePayment } from 'react-icons/md';
import { setIsAuth, setUser } from '../../redux/slices/userSlice';
import { setIsOpened } from '../../redux/slices/menuSlice';
import { setSortBy, setSortType } from '../../redux/slices/filterSlice';
import Button from '../Button';
import styles from './Menu.module.scss';

const Menu = memo(() => {
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
      link: '/first_pays',
      icon: <MdOutlinePayment size={30} color="rgba(171,171,171, 0.75)" />,
      name: 'Первые платежи',
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

  return (
    <>
      <div
        className={
          isOpened
            ? `${styles.darkBackground} ${styles.show}`
            : `${styles.darkBackground} ${styles.hide}`
        }
        onClick={() => {
          dispatch(setIsOpened(false));
        }}
      />
      <nav
        className={
          isOpened
            ? `${styles.menu} ${styles.opened}`
            : `${styles.menu} ${styles.closed}`
        }
      >
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
                >
                  <Button
                    location="menu"
                    isActive={
                      location.pathname === `${item.link}` ? 'true' : 'false'
                    }
                    onClickHandler={() => {
                      dispatch(setSortBy(''));
                      dispatch(setSortType(''));
                      dispatch(setIsOpened(false));
                    }}
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
    </>
  );
});

export default Menu;
