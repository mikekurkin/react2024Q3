import './Paginator.css';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  pageClickHandler: (page: number) => void;
};

function Paginator(props: PaginatorProps) {
  return props.totalPages < 2 ? null : (
    <>
      <div className='paginator'>
        {[...Array(props.totalPages)].map((_index, idx) => (
          <button
            key={idx + 1}
            onClick={() => props.pageClickHandler(idx + 1)}
            className={idx + 1 == props.currentPage ? 'paginator-page active' : 'paginator-page'}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Paginator;
