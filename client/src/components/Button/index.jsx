import { memo } from 'react';
import styles from './Button.module.scss';

const Button = memo((props) => {
  return (
    <button
      location={props.location}
      className={
        props.isActive === 'true'
          ? `${styles.button} ${styles._active}`
          : styles.button
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
});

export default Button;
