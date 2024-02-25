import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { RxCross2 } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import { LuSettings2 } from 'react-icons/lu';
import { setSearch } from '../../redux/slices/filterSlice';
import { setIsVisible, setPressedButton } from '../../redux/slices/modalSlice';
import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [string, setString] = useState('');

  useEffect(() => {
    return () => {
      dispatch(setSearch(''));
    };
  }, []);

  const updateSearch = useCallback(
    debounce((name) => {
      dispatch(setSearch(name));
    }, 250),
    []
  );

  const clearSearch = () => {
    setString('');
    dispatch(setSearch(''));
    inputRef.current.focus();
  };

  const onChangeInput = (value) => {
    setString(value);
    updateSearch(value);
  };

  return (
    <label className={styles.searchWrapper}>
      <IoSearchOutline className={styles.searchIcon} size={30} />
      <input
        ref={inputRef}
        placeholder="Поиск..."
        type="text"
        value={string}
        className={styles.search}
        onChange={(event) => {
          onChangeInput(event.target.value);
        }}
      />
      <LuSettings2
        size={30}
        className={styles.filters}
        onClick={() => {
          dispatch(setIsVisible(true));
          dispatch(setPressedButton('filters'));
        }}
      />
      {string && (
        <RxCross2
          className={styles.cross}
          size={30}
          onClick={() => {
            clearSearch();
          }}
        />
      )}
    </label>
  );
};

export default Search;
