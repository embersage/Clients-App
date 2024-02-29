import { memo, useCallback, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import debounce from 'lodash.debounce';
import styles from './Input.module.scss';

const Input = memo((props) => {
  const { delay, value, onChangeHandler, placeholder, type } = props;
  const inputRef = useRef();
  const [string, setString] = useState(value || '');

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
        type={type}
        className={styles.input}
        placeholder={placeholder}
      />
      {string && (
        <RxCross2
          className={styles.cross}
          size={30}
          onClick={() => {
            clearValue();
          }}
        />
      )}
    </label>
  );
});

export default Input;
