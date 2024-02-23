import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { signIn } from '../../redux/slices/userSlice';
import { USERS_ROUTE } from '../../utils/consts';
import styles from './LoginBlock.module.scss';

const AuthorizationBlock = () => {
  //const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const login = async (email, password) => {
    const response = await dispatch(signIn({ email, password }));
    if (response.payload) {
      navigate(USERS_ROUTE);
    } else {
      setValid(false);
    }
  };

  return (
    <div className={styles.authorizationBlock}>
      <h1 className={styles.title}>Вход в систему</h1>
      <form className={styles.form}>
        {!valid && (
          <h2 className={styles.warning}>Неверный логин или пароль</h2>
        )}
        <div className={styles.inputs}>
          <label className={styles.inputWrapper}>
            {valid ? (
              <input
                ref={emailRef}
                placeholder="Email"
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
                placeholder="Email"
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
          <label className={styles.inputWrapper}>
            {valid ? (
              <input
                ref={passwordRef}
                placeholder="Пароль"
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
                placeholder="Пароль"
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
        </div>
        <button
          className={styles.button}
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
