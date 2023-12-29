import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import { setSearch } from '../../redux/slices/filterSlice';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [string, setString] = useState('');
  let searchValue;
  if (location.pathname.includes('/users')) {
    searchValue = 'Найти клиента...';
  } else if (location.pathname.includes('/payments')) {
    searchValue = 'Найти операцию...';
  }

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
    <label>
      <IoSearchOutline className={styles.searchIcon} size={30} />
      <input
        ref={inputRef}
        placeholder={searchValue}
        type="text"
        value={string}
        className={styles.search}
        onChange={(event) => {
          onChangeInput(event.target.value);
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
