import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../redux/slices/usersSlice';
import styles from './InformationBlock.module.scss';

const InformationBlock = (props) => {
  const { data, setData, user } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing, user]);

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
            <label key={index}>
              <span>{item.name}</span>
              {isEditing && editingIndex === index ? (
                <input
                  ref={inputRef}
                  type={item.type}
                  value={item.value ? item.value : ''}
                  placeholder={!item.value ? 'Нет данных' : ''}
                  disabled={item.disabled}
                  onChange={(event) => {
                    onChangeHandle(event, item);
                  }}
                />
              ) : (
                <span
                  onClick={() => {
                    if (!item.disabled) {
                      onClickHandle(index);
                    }
                  }}
                >
                  {/*   {item.value ? `${item.value}` : 'Нет данных'} */}
                  {user[item.propName] ? user[item.propName] : 'Нет данных'}
                </span>
              )}
            </label>
          );
        })}
        {isEditing && (
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              setIsEditing(false);
              setEditingIndex(null);
              dispatch(
                editUser({
                  id: data[0].value,
                  data: {
                    [data[editingIndex].propName]: data[editingIndex].value,
                  },
                })
              );
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
