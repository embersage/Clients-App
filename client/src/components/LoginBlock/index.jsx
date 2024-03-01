import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../redux/slices/userSlice';
import { USERS_ROUTE } from '../../utils/consts';
import Input from '../Input';
import styles from './LoginBlock.module.scss';
import Button from '../Button';
import { CiLogin } from 'react-icons/ci';

const LoginBlock = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);

  const login = async (email, password) => {
    const response = await dispatch(signIn({ email, password }));
    if (response.payload) {
      navigate(USERS_ROUTE);
    } else {
      setValid(false);
    }
  };

  const handleEmailChange = useCallback((value) => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback((value) => {
    setPassword(value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      login(email, password);
    },
    [email, password]
  );

  return (
    <div className={styles.loginBlock}>
      <h1 className={styles.title}>Вход в систему</h1>
      <form className={styles.form}>
        {!valid && (
          <h2 className={styles.warning}>Неверный логин или пароль</h2>
        )}
        <div className={styles.inputs}>
          <Input
            delay={0}
            valid={valid}
            onChangeHandler={handleEmailChange}
            placeholder="Логин"
            type="text"
          />
          <Input
            delay={0}
            valid={valid}
            onChangeHandler={handlePasswordChange}
            placeholder="Пароль"
            type="password"
          />
        </div>
        <Button onClickHandler={handleSubmit}>
          <CiLogin size={30} color="rgba(171,171,171, 0.75)" />
          <span>Войти</span>
        </Button>
      </form>
    </div>
  );
});

export default LoginBlock;
