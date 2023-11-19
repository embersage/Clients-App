import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { login } from '../../http/userApi';
import { setIsAuth, setUser } from '../../redux/slices/userSlice';
import styles from './AuthorizationBlock.module.scss';

const AuthorizationBlock = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef();
  const passwordRef = useRef();

  const signIn = async (email, password) => {
    try {
      const data = await login(email, password);
      dispatch(setUser(user));
      dispatch(setIsAuth(true));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={styles.authorizationBlock}>
      <h1>Вход в систему</h1>
      <form>
        <label>
          <span>Email</span>
          <input
            ref={inputRef}
            placeholder="Введите email"
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {email && (
            <RxCross2
              className={styles.cross}
              size={30}
              onClick={() => {
                inputRef.current.focus();
                setEmail('');
              }}
            />
          )}
        </label>
        <label>
          <span>Пароль</span>
          <input
            ref={passwordRef}
            placeholder="Введите пароль"
            type={isVisible ? 'text' : 'password'}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {isVisible
            ? password && (
                <FaRegEye
                  className={styles.eye}
                  size={30}
                  onClick={() => {
                    setIsVisible(!isVisible);
                  }}
                />
              )
            : password && (
                <FaRegEyeSlash
                  className={styles.eye}
                  size={30}
                  onClick={() => {
                    setIsVisible(!isVisible);
                  }}
                />
              )}
          {password && (
            <RxCross2
              className={styles.cross}
              size={30}
              onClick={() => {
                inputRef.current.focus();
                setPassword('');
              }}
            />
          )}
        </label>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            signIn(email, password);
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default AuthorizationBlock;

//qwerty@mail.ru 2281337
