import { memo, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import styles from './Pagination.module.scss';

const Pagination = memo((props) => {
  const { totalCount, limit, setPage } = props;
  const pageCount = Math.ceil(totalCount / limit);

  useEffect(() => {
    return () => {
      setPage(1);
    };
  }, []);

  return (
    <ReactPaginate
      className={styles.pages}
      breakLabel="..."
      nextLabel={<AiOutlineDoubleRight />}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel={<AiOutlineDoubleLeft />}
      onPageChange={(event) => {
        setPage(event.selected + 1);
      }}
    />
  );
});

export default Pagination;
