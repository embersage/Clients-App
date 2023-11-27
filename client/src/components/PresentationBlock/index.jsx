import styles from './PresentationBlock.module.scss';

const PresentationsBlock = (props) => {
  const { id } = props;
  return <div className={styles.presentationBlock}>{id}</div>;
};

export default PresentationsBlock;
