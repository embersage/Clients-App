import styles from './PresentationBlock.module.scss';

const PresentationsBlock = (props) => {
  const { presentations } = props;
  return (
    <div className={styles.presentationBlock}>
      <ul>
        {presentations.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default PresentationsBlock;
