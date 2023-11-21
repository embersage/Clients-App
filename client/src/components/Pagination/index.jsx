import ReactPaginate from 'react-paginate';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import styles from './Pagination.module.scss';

const Pagination = () => {
  return (
    <ReactPaginate
    className={styles.pages}
      breakLabel="..."
      nextLabel={<AiOutlineDoubleRight />}
      onPageChange={console.log(1)}
      pageRangeDisplayed={3}
      pageCount={10}
      previousLabel={<AiOutlineDoubleLeft />}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
