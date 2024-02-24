import { useEffect, useRef, useState } from 'react';
import styles from './InformationBlock.module.scss';

const InformationBlock = (props) => {
  const inputRef = useRef();
  const { data, setData, edit } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onClickHandle = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
  };

  const onChangeHandle = (event, item) => {
    setData(
      data.map((object) => {
        return item.name === object.name
          ? { ...object, value: event.target.value }
          : object;
      })
    );
  };

  return (
    <div className={styles.informationBlock}>
      <h2>Данные</h2>
      <form className={styles.data}>
        {data.map((item, index) => {
          return (
            <label className={styles.inputWrapper} key={index}>
              <span>{item.name}</span>
              {isEditing && editingIndex === index ? (
                <div className={styles.editing}>
                  <input
                    className={styles.input}
                    ref={inputRef}
                    type={item.type}
                    value={inputValue}
                    placeholder={!item.value ? 'Нет данных' : ''}
                    disabled={item.disabled}
                    onChange={(event) => {
                      setInputValue(event.target.value);
                      onChangeHandle(event, item);
                    }}
                  />
                  <button
                    className={styles.saveButton}
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      setIsEditing(false);
                      setEditingIndex(null);
                      edit(editingIndex);
                    }}
                  >
                    Сохранить
                  </button>
                </div>
              ) : (
                <span
                  onClick={() => {
                    if (!item.disabled) {
                      onClickHandle(index);
                      setInputValue(
                        item.value
                          ? item.type === 'datetime-local'
                            ? new Date(
                                new Date(item.value).getTime() -
                                  new Date(item.value).getTimezoneOffset() *
                                    60000
                              )
                                .toISOString()
                                .slice(0, -1)
                            : item.value
                          : ''
                      );
                    }
                  }}
                >
                  {item.value
                    ? item.type === 'datetime-local'
                      ? new Date(item.value).toLocaleString()
                      : `${item.value}`
                    : 'Нет данных'}
                </span>
              )}
            </label>
          );
        })}
        {isEditing && (
          <button
            className={styles.saveButtonBottom}
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              setIsEditing(false);
              setEditingIndex(null);
              edit(editingIndex);
            }}
          >
            Сохранить
          </button>
        )}
      </form>
    </div>
  );
};

export default InformationBlock;
