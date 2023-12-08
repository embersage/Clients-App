import styles from './PresentationBlock.module.scss';

const PresentationsBlock = (props) => {
  const { presentations } = props;
  return (
    <div className={styles.presentationBlock}>
      {presentations.length ? (
        <ul>
          {presentations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <span>Нет презентаций ☹️</span>
      )}
    </div>
  );
};

export default PresentationsBlock;
