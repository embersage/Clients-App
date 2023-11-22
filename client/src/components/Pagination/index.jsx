import ReactPaginate from 'react-paginate';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/slices/usersSlice';

const Pagination = () => {
  const page = useSelector((state) => state.users.page);
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.users.totalCount);
  const limit = useSelector((state) => state.users.limit);
  const pageCount = Math.ceil(totalCount / limit);

  return (
    <ReactPaginate
      className={styles.pages}
      breakLabel="..."
      nextLabel={<AiOutlineDoubleRight />}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel={<AiOutlineDoubleLeft />}
      onPageChange={(event) => {
        dispatch(setPage(event.selected + 1));
      }}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
