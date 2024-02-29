import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import debounce from 'lodash.debounce';
import styles from './Input.module.scss';

const Input = memo((props) => {
  const { onChangeHandler, placeholder, value, type } = props;
  const inputRef = useRef();
  const [string, setString] = useState('');

  useEffect(() => {
    setString(value);
  }, [value]);

  const updateValue = useCallback(
    debounce((value) => {
      onChangeHandler(value);
    }, 250),
    [onChangeHandler]
  );

  const clearValue = () => {
    setString('');
    onChangeHandler('');
    inputRef.current.focus();
  };

  const onChangeInput = async (value) => {
    setString(value);
    updateValue(value);
  };

  return (
    <label className={styles.inputWrapper}>
      <input
        ref={inputRef}
        type={type}
        value={string}
        className={styles.input}
        onChange={(event) => {
          onChangeInput(event.target.value);
        }}
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
