import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { setUsersPage } from '../../redux/slices/usersSlice';
import { setPaymentsPage } from '../../redux/slices/paymentsSlice';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const usersTotalCount = useSelector((state) => state.users.totalCount);
  const paymentsTotalCount = useSelector((state) => state.payments.totalCount);
  const usersPage = useSelector((state) => state.users.page);
  const paymentsPage = useSelector((state) => state.payments.page);
  const usersLimit = useSelector((state) => state.users.limit);
  const paymentsLimit = useSelector((state) => state.payments.limit);
  const usersPageCount = Math.ceil(usersTotalCount / usersLimit);
  const paymentsPageCount = Math.ceil(paymentsTotalCount / paymentsLimit);

  useEffect(() => {
    return () => {
      if (usersPage !== 1) {
        dispatch(setUsersPage(1));
      }
      if (paymentsPage !== 1) {
        dispatch(setPaymentsPage(1));
      }
    };
  }, []);

  return (
    <ReactPaginate
      className={styles.pages}
      breakLabel="..."
      nextLabel={<AiOutlineDoubleRight />}
      pageRangeDisplayed={3}
      pageCount={
        location.pathname.includes('/users')
          ? usersPageCount
          : paymentsPageCount
      }
      previousLabel={<AiOutlineDoubleLeft />}
      onPageChange={(event) => {
        location.pathname.includes('/users')
          ? dispatch(setUsersPage(event.selected + 1))
          : dispatch(setPaymentsPage(event.selected + 1));
      }}
    />
  );
};

export default Pagination;
