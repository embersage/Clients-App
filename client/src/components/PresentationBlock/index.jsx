import styles from './PresentationBlock.module.scss';

const PresentationsBlock = (props) => {
  const { presentations } = props;
  return (
    <div className={styles.presentationBlock}>
      <h2>Презентации</h2>
      {presentations.length ? (
        <ul className={styles.presentations}>
          {presentations.map((item, index) => (
            <li key={index}>
              <div className={styles.presentationCart}>
                <span>{item.id}</span>
                <span>{item.name}</span>
                <span>{item.description}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span>Нет презентаций ☹️</span>
      )}
    </div>
  );
};

export default PresentationsBlock;
