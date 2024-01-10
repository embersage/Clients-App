import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import { setSortBy, setSortType } from '../../redux/slices/filterSlice';
import Table from '../Table';
import TableRow from '../TableRow';
import styles from './PresentationBlock.module.scss';

const PresentationsBlock = (props) => {
  const { presentations } = props;
  const values = ['id', 'name', 'description'];
  const headers = ['id', 'Название', 'Описание'];
  const [clickedHeader, setClickedHeader] = useState();
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortType = useSelector((state) => state.filter.sortType);

  const handleCheckboxClick = () => {};

  return (
    <>
      {presentations && presentations.length ? (
        <Table
          name={'Презентации'}
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
              <IoIosArrowRoundUp />
            ) : sortType === 'DESC' ? (
              <IoIosArrowRoundDown />
            ) : (
              ''
            )
          }
          checked={true}
          onSelect={handleCheckboxClick}
        >
          {presentations.map((item) => (
            <TableRow key={item.id} values={values}>
              {item}
            </TableRow>
          ))}
        </Table>
      ) : (
        <span>Нет презентаций ☹️</span>
      )}
    </>
  );
};

export default PresentationsBlock;
