import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>Header</h1>
      </div>
    </header>
  );
};

export default Header;
