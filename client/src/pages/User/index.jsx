import { useParams } from 'react-router-dom';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import PresentationBlock from '../../components/PresentationBlock';
import styles from './User.module.scss';

const User = () => {
  const { id } = useParams();

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <InformationBlock id={id} />
          <PresentationBlock id={id} />
        </div>
      </div>
    </>
  );
};

export default User;
