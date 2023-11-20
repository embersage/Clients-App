import { BiStats } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { LiaRubleSignSolid } from 'react-icons/lia';
import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.pages}>
        <li className={styles.page}>
          <BiStats
            size={30}
            className={styles.icon}
            color="rgba(171,171,171, 0.75)"
          />
          <span>Главная</span>
        </li>
        <li className={`${styles._active} ${styles.page}`}>
          <GoPeople
            size={30}
            className={styles.icon}
            color="rgba(171,171,171, 0.75)"
          />
          <span>Клиенты</span>
        </li>
        <li className={styles.page}>
          <LiaRubleSignSolid
            size={30}
            className={styles.icon}
            color="rgba(171,171,171, 0.75)"
          />
          <span>Операции</span>
        </li>
        <li className={styles.page}>
          <CiLogout
            size={30}
            className={styles.icon}
            color="rgba(171,171,171, 0.75)"
          />
          <span>Выход</span>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
