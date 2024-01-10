import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  getPromocode,
  removePromocodes,
} from '../../redux/slices/promocodesSlice';
import { PROMOCODES_ROUTE } from '../../utils/consts';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import Button from '../../components/Button';
import styles from './Promocode.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';

const Promocode = () => {
  const { id } = useParams();
  const promocode = useSelector((state) => state.promocodes.promocode);
  const status = useSelector((state) => state.promocodes.status);
  const selectedPromocodes = useSelector(
    (state) => state.promocodes.selectedPromocodes
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPromocode = async () => {
      await dispatch(getPromocode({ id }));
    };

    fetchPromocode();
  }, []);

  const deletePromocodes = async (promocodes) => {
    await dispatch(removePromocodes(promocodes));
  };

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header>
          <div className={headerStyles.buttons}>
            <Button
              onClick={(event) => {
                event.preventDefault();
                deletePromocodes({ promocodes: selectedPromocodes });
                navigate(PROMOCODES_ROUTE);
              }}
            >
              <AiOutlineDelete
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Удалить</span>
            </Button>
          </div>
        </Header>
        <div className={styles.content}>
          {status === 'succeeded' ? (
            <>
              <InformationBlock {...promocode} />
            </>
          ) : (
            <>
              <div className={styles.informationBlockLoading}>
                <BsArrowClockwise className={styles.loadingIcon} size={75} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Promocode;
