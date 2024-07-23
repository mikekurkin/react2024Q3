import CharacterCard from '../CharacterCard/CharacterCard';
import Loader from '../Loader/Loader';
import Paginator from '../Paginator/Paginator';

import { useDispatch, useSelector } from 'react-redux';
import { swApi } from '../../services/swApi/sw';
import { setDetails, setPage } from '../../state/searchResults/searchResultsSlice';
import { RootState } from '../../state/store';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

function SearchResults() {
  const { query, page, details } = useSelector((state: RootState) => state.searchResults);
  const dispatch = useDispatch();

  const { data, isFetching } = swApi.useSearchPeopleQuery({ search: query, page });

  return (
    <div className='flex flex-col'>
      <Paginator
        currentPage={page}
        totalPages={Math.ceil((data?.count ?? 0) / 10)}
        pageClickHandler={(page) => {
          dispatch(setDetails(null));
          dispatch(setPage(page));
        }}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <div className='flex flex-row'>
          <div className='flex-item'>
            {data?.results.map((character, index) => (
              <CharacterCard
                key={index}
                character={character}
                active={details != null && details == index}
                onClick={() => dispatch(setDetails(details == index ? null : index))}
              />
            ))}
          </div>

          {details != null && data?.results[details] && !isFetching ? (
            <CharacterDetails character={data.results[details]} closeDetails={() => dispatch(setDetails(null))} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
