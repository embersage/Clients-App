import { memo } from 'react';
import styles from './Button.module.scss';

const Button = memo((props) => {
  const { onClickHandler } = props;
  
  return (
    <button
      location={props.location}
      className={
        props.isActive === 'true'
          ? `${styles.button} ${styles._active}`
          : styles.button
      }
      onClick={onClickHandler}
    >
      {props.children}
    </button>
  );
});

export default Button;
