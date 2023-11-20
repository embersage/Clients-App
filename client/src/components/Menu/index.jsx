import { Link, useLocation } from 'react-router-dom';
import { BiStats } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { LiaRubleSignSolid } from 'react-icons/lia';
import styles from './Menu.module.scss';
import { useSelector } from 'react-redux';

const Menu = () => {
  const isOpened = useSelector((state) => state.menu.isOpened);
  const location = useLocation();

  if (isOpened) {
    return (
      <nav className={styles.menu}>
        <ul className={styles.pages}>
          <Link to="/">
            <li
              className={
                location.pathname === '/'
                  ? `${styles._active} ${styles.page}`
                  : styles.page
              }
            >
              <BiStats
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Главная</span>
            </li>
          </Link>
          <Link to="/users">
            <li
              className={
                location.pathname === '/users'
                  ? `${styles._active} ${styles.page}`
                  : styles.page
              }
            >
              <GoPeople
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Клиенты</span>
            </li>
          </Link>
          <Link to="/payments">
            <li
              className={
                location.pathname === '/payments'
                  ? `${styles._active} ${styles.page}`
                  : styles.page
              }
            >
              <LiaRubleSignSolid
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Операции</span>
            </li>
          </Link>
          <Link to="/login">
            <li
              className={
                location.pathname === '/login'
                  ? `${styles._active} ${styles.page}`
                  : styles.page
              }
            >
              <CiLogout
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Выход</span>
            </li>
          </Link>
        </ul>
      </nav>
    );
  }
};

export default Menu;
