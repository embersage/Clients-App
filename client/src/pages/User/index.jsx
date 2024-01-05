import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowClockwise } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { getUser, removeUsers } from '../../redux/slices/usersSlice';
import { deleteUsers } from '../../http/usersApi';
import { USERS_ROUTE } from '../../utils/consts';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import TariffBlock from '../../components/TariffBlock';
import PresentationBlock from '../../components/PresentationBlock';
import Button from '../../components/Button';
import styles from './User.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.users.user);
  const status = useSelector((state) => state.users.status);
  const selectedUsers = useSelector((state) => state.users.selectedUsers);
  const navigate = useNavigate();
  //const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUser({ id }));
    };

    fetchUser();
  }, []);

  const deleteUsers = async (users) => {
    const response = await dispatch(removeUsers(users));
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
                deleteUsers({ users: selectedUsers });
                navigate(USERS_ROUTE);
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
              <InformationBlock {...user} />
              <div className={styles.additionalInfo}>
                <TariffBlock />
                <PresentationBlock presentations={user.presentations} />
              </div>
            </>
          ) : (
            <>
              <div className={styles.informationBlockLoading}>
                <BsArrowClockwise className={styles.loadingIcon} size={75} />
              </div>
              <div className={styles.additionalInfo}>
                <div className={styles.tariffBlockLoading}>
                  <BsArrowClockwise className={styles.loadingIcon} size={75} />
                </div>
                <div className={styles.presentationBlockLoading}>
                  <BsArrowClockwise className={styles.loadingIcon} size={75} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
