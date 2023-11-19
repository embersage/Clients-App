import AuthorizationBlock from '../../components/LoginBlock';
import styles from './Authorization.module.scss';

const Authorization = () => {
  return (
    <div className={styles.authorization}>
      <AuthorizationBlock className={styles.form} />
    </div>
  );
};

export default Authorization;
