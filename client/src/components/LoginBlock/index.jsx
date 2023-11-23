import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { login } from '../../http/userApi';
import { setIsAuth, setUser, signIn } from '../../redux/slices/userSlice';
import { HOME_ROUTE, USERS_ROUTE } from '../../utils/consts';
import styles from './LoginBlock.module.scss';

const AuthorizationBlock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  //const signIn = async (email, password) => {
  //  try {
  //    const data = await login(email, password);
  //    if (data.id_role !== 1) {
  //      dispatch(setUser(data));
  //      dispatch(setIsAuth(true));
  //      navigate(USERS_ROUTE);
  //    }
  //  } catch (error) {
  //    setValid(false);
  //    console.log(error.message);
  //  }
  //};

  const login = async (email, password) => {
    const data = await dispatch(signIn({ email, password }));
    console.log(data.payload);
    if (data.payload) {
      navigate(HOME_ROUTE);
    }
  };

  return (
    <div className={styles.authorizationBlock}>
      <h1>Вход в систему</h1>
      {!valid && <h2>Неверный логин или пароль</h2>}
      <form>
        <label>
          <span>Email</span>
          {valid ? (
            <input
              ref={emailRef}
              placeholder="Введите email"
              type="text"
              value={email}
              className={styles.input}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          ) : (
            <input
              ref={emailRef}
              placeholder="Введите email"
              type="text"
              value={email}
              className={styles.redInput}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          )}
          {email && (
            <RxCross2
              className={styles.cross}
              size={30}
              onClick={() => {
                emailRef.current.focus();
                setEmail('');
              }}
            />
          )}
        </label>
        <label>
          <span>Пароль</span>
          {valid ? (
            <input
              ref={passwordRef}
              placeholder="Введите пароль"
              type={isVisible ? 'text' : 'password'}
              value={password}
              className={styles.input}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          ) : (
            <input
              ref={passwordRef}
              placeholder="Введите пароль"
              type={isVisible ? 'text' : 'password'}
              value={password}
              className={styles.redInput}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          )}

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
                emailRef.current.focus();
                setPassword('');
              }}
            />
          )}
        </label>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            login(email, password);
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
