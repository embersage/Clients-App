import AuthorizationBlock from '../../components/LoginBlock';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.login}>
      <AuthorizationBlock />
    </div>
  );
};

export default Login;
