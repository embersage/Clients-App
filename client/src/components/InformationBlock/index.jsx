import { useState } from 'react';
import { MdSaveAlt } from 'react-icons/md';
import Input from '../Input';
import Button from '../Button';
import styles from './InformationBlock.module.scss';

const InformationBlock = (props) => {
  const { data, setData, edit } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const onClickHandle = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
  };

  const onChangeHandle = (item, value) => {
    setData(
      data.map((object) => {
        return item.name === object.name ? { ...object, value } : object;
      })
    );
  };

  return (
    <div className={styles.informationBlock}>
      <h2>Данные</h2>
      <form className={styles.data}>
        <div className={styles.rows}>
          {data.map((item, index) => {
            return (
              <label className={styles.inputWrapper} key={index}>
                <span
                  className={
                    !item.disabled
                      ? `${styles.property} ${styles.editable}`
                      : `${styles.property}`
                  }
                >
                  {item.name}:
                </span>
                {isEditing && editingIndex === index ? (
                  <div className={styles.editing}>
                    <Input
                      delay={0}
                      value={inputValue}
                      onChangeHandler={(value) => {
                        onChangeHandle(item, value);
                      }}
                      placeholder={!item.value ? 'Нет данных' : ''}
                      type={item.type}
                    />
                    <Button
                      onClickHandler={(event) => {
                        event.preventDefault();
                        setIsEditing(false);
                        setEditingIndex(null);
                        edit(editingIndex);
                      }}
                    >
                      <MdSaveAlt
                        size={30}
                        className={styles.icon}
                        color="rgba(171,171,171, 0.75)"
                      />
                      <span>Сохранить</span>
                    </Button>
                  </div>
                ) : (
                  <span
                    className={
                      !item.disabled
                        ? `${styles.value} ${styles.editable}`
                        : `${styles.property}`
                    }
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
        </div>
        {isEditing && (
          <Button
            onClickHandler={(event) => {
              event.preventDefault();
              setIsEditing(false);
              setEditingIndex(null);
              edit(editingIndex);
            }}
          >
            <MdSaveAlt
              size={30}
              className={styles.icon}
              color="rgba(171,171,171, 0.75)"
            />
            <span>Сохранить</span>
          </Button>
        )}
      </form>
    </div>
  );
};

export default InformationBlock;
