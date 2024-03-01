import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { PiArrowsClockwise } from 'react-icons/pi';
import { MdSaveAlt } from 'react-icons/md';
import {
  getPromocode,
  editPromocode,
  removePromocodes,
} from '../../redux/slices/promocodesSlice';
import {
  getTariffs,
  setSelectedItems,
  addSelectedItem,
  removeSelectedItem,
} from '../../redux/slices/tariffsSlice';
import { setSortBy, setSortType } from '../../redux/slices/filterSlice';
import { PROMOCODES_ROUTE } from '../../utils/consts';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import InformationBlock from '../../components/InformationBlock';
import Button from '../../components/Button';
import Table from '../../components/Table';
import TableRow from '../../components/TableRow';
import styles from './Promocode.module.scss';
import headerStyles from '../../components/Header/Header.module.scss';

const Promocode = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [clickedHeader, setClickedHeader] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const promocode = useSelector((state) => state.promocodes.promocode);
  const promocodesStatus = useSelector((state) => state.promocodes.status);
  const tariffs = useSelector((state) => state.tariffs.items);
  const selectedItems = useSelector((state) => state.tariffs.selectedItems);
  const tariffsStatus = useSelector((state) => state.tariffs.status);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);
  const values = ['id', 'name', 'amount'];
  const headers = ['id', 'Название', 'Сумма'];

  useEffect(() => {
    dispatch(getPromocode({ id }));
    dispatch(getTariffs({ usePagination: false, sortBy, sortType }));
  }, [sortBy, sortType]);

  useEffect(() => {
    if (promocodesStatus === 'succeeded') {
      setData([
        {
          propName: 'id',
          name: 'id',
          value: promocode.id,
          disabled: true,
          type: 'number',
        },
        {
          propName: 'code',
          name: 'Код',
          value: promocode.code,
          disabled: false,
          type: 'text',
        },
        {
          propName: 'discount',
          name: 'Скидка',
          value: promocode.discount,
          disabled: false,
          type: 'number',
        },
        {
          propName: 'date_start',
          name: 'Дата начала',
          value: promocode.date_start,
          disabled: false,
          type: 'datetime-local',
        },
        {
          propName: 'date_end',
          name: 'Дата окончания',
          value: promocode.date_end,
          disabled: false,
          type: 'datetime-local',
        },
      ]);
    }
    if (tariffsStatus === 'succeeded') {
      dispatch(setSelectedItems(promocode.tariffs));
    }
  }, [promocodesStatus, tariffsStatus]);

  const deletePromocodes = (promocodes) => {
    dispatch(removePromocodes(promocodes));
  };

  const edit = (editingIndex) => {
    dispatch(
      editPromocode({
        id,
        data: {
          [data[editingIndex].propName]: data[editingIndex].value,
        },
      })
    );
  };

  const handleCheckboxClick = () => {
    if (selectedItems.length !== tariffs.length) {
      dispatch(setSelectedItems(tariffs));
    } else {
      dispatch(setSelectedItems([]));
    }
  };

  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <Header>
          <div className={headerStyles.buttons}>
            <Button
              onClickHandler={async (event) => {
                await dispatch(
                  editPromocode({
                    id,
                    data: {
                      tariffs: selectedItems,
                    },
                  })
                );
              }}
            >
              <MdSaveAlt
                size={30}
                className={styles.icon}
                color="rgba(171,171,171, 0.75)"
              />
              <span>Сохранить</span>
            </Button>
            <Button
              onClickHandler={(event) => {
                event.preventDefault();
                deletePromocodes({ promocodes: [promocode] });
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
          {promocodesStatus === 'succeeded' && tariffsStatus === 'succeeded' ? (
            <>
              <InformationBlock
                data={data}
                setData={setData}
                promocode={promocode}
                edit={edit}
              />
              <div className={styles.additionalInfo}>
                <>
                  {tariffs.length ? (
                    <Table
                      page="promocode"
                      name={'Тарифы'}
                      headers={headers}
                      values={values}
                      clickedHeader={clickedHeader}
                      onHeaderClick={(item) => {
                        dispatch(setSortBy(item));
                        setClickedHeader(item);
                        if (sortType === 'DESC' || !sortType) {
                          dispatch(setSortType('ASC'));
                        }
                        if (sortType === 'ASC') {
                          dispatch(setSortType('DESC'));
                        } else if (sortType) {
                          dispatch(setSortType(''));
                        }
                      }}
                      icon={
                        sortType === 'ASC' ? (
                          <FiChevronUp />
                        ) : sortType === 'DESC' ? (
                          <FiChevronDown />
                        ) : (
                          ''
                        )
                      }
                      checked={selectedItems?.length === tariffs?.length}
                      onSelect={handleCheckboxClick}
                      showCheckbox={true}
                    >
                      {tariffs.map((item) => (
                        <TableRow
                          key={item.id}
                          values={values}
                          showCheckbox={true}
                          checked={selectedItems?.some((element) => {
                            if (element.id === item.id) {
                              return true;
                            }
                            return false;
                          })}
                          onSelect={async () => {
                            dispatch(addSelectedItem(item));
                          }}
                          onUnselect={async () => {
                            dispatch(removeSelectedItem(item));
                          }}
                        >
                          {item}
                        </TableRow>
                      ))}
                    </Table>
                  ) : (
                    <span>Нет тарифов ☹️</span>
                  )}
                </>
              </div>
            </>
          ) : (
            <>
              <div className={styles.loadingBanner}>
                <PiArrowsClockwise className={styles.loadingIcon} size={75} />
              </div>
              <div className={styles.additionalInfo}>
                <div className={styles.loadingBanner}>
                  <PiArrowsClockwise className={styles.loadingIcon} size={75} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Promocode;
