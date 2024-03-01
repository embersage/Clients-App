import { memo, useCallback, useRef, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import debounce from 'lodash.debounce';
import styles from './Input.module.scss';

const Input = memo((props) => {
  const { delay, valid, value, onChangeHandler, placeholder, type } = props;
  const inputRef = useRef();
  const [string, setString] = useState(value || '');
  const [isVisible, setIsVisible] = useState(false);

  const updateValue = useCallback(
    debounce((value) => {
      onChangeHandler(value);
    }, delay),
    []
  );

  const clearValue = () => {
    setString('');
    onChangeHandler('');
    inputRef.current.focus();
  };

  const onChangeInput = (value) => {
    setString(value);
    updateValue(value);
  };

  return (
    <label className={styles.inputWrapper}>
      <input
        value={string}
        onChange={(event) => {
          onChangeInput(event.target.value);
        }}
        ref={inputRef}
        type={isVisible ? 'text' : type}
        className={
          valid || valid === undefined ? styles.input : styles.redInput
        }
        placeholder={placeholder}
      />
      <span className={styles.icons}>
        {type === 'password' &&
          string &&
          (isVisible ? (
            <FaRegEye
              className={styles.eye}
              size={30}
              onClick={() => {
                setIsVisible(!isVisible);
              }}
            />
          ) : (
            <FaRegEyeSlash
              className={styles.eye}
              size={30}
              onClick={() => {
                setIsVisible(!isVisible);
              }}
            />
          ))}
        {string && (
          <RxCross2
            className={styles.cross}
            size={30}
            onClick={() => {
              clearValue();
            }}
          />
        )}
      </span>
    </label>
  );
});

export default Input;
