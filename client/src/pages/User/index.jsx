import Menu from '../../components/Menu';
import Header from '../../components/Header';
import styles from './User.module.scss';

import { useParams } from 'react-router-dom';
import InformationBlock from '../../components/InformationBlock';

const User = () => {
  const { id } = useParams();

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header />
        <InformationBlock id={id} />
      </div>
    </>
  );
};

export default User;
