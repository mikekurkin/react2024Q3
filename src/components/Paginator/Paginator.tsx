import { useDispatch } from 'react-redux';
import { setPage } from '../../state/searchResults/searchResultsSlice';
import './Paginator.css';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
}

const Paginator = ({ currentPage, totalPages }: PaginatorProps) => {
  const dispatch = useDispatch();

  return totalPages < 2 ? null : (
    <>
      <div className='paginator'>
        {[...Array(totalPages)].map((_index, idx) => (
          <button
            key={idx + 1}
            onClick={() => dispatch(setPage(idx + 1))}
            className={idx + 1 == currentPage ? 'paginator-page active' : 'paginator-page'}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Paginator;
