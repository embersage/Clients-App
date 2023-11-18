import { useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import styles from './AuthorizationBlock.module.scss';

const AuthorizationBlock = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef();
  const passwordRef = useRef();

  return (
    <div className={styles.authorizationBlock}>
      <h1>Вход в систему</h1>
      <form>
        <div>
          <label for="email">Email</label>
          <input
            ref={inputRef}
            placeholder="Введите email"
            type="text"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {email && (
            <RxCross2
              className={styles.emailIcon}
              size={20}
              onClick={() => {
                inputRef.current.focus();
                setEmail('');
              }}
            />
          )}
        </div>
        <div>
          <label for="password">Пароль</label>
          <input
            ref={passwordRef}
            placeholder="Введите пароль"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {password && (
            <RxCross2
              className={styles.passwordIcon}
              size={20}
              onClick={() => {
                passwordRef.current.focus();
                setPassword('');
              }}
            />
          )}
        </div>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default AuthorizationBlock;
