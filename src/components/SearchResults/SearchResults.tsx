import { useEffect, useState } from 'react';
import api from '../../services/api/api';
import CharacterCard from '../CharacterCard/CharacterCard';
import CharacterDetails, { CharacterDetailsProps } from '../CharacterDetails/CharacterDetails';
import Loader from '../Loader/Loader';
import Paginator from '../Paginator/Paginator';

import { useDispatch, useSelector } from 'react-redux';
import { setDetails, setIsLoading, setPage } from '../../state/searchResults/searchResultsSlice';
import { RootState } from '../../state/store';

function SearchResults() {
  const [characters, setCharacters] = useState<CharacterDetailsProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const { query, page, details, isLoading } = useSelector((state: RootState) => state.searchResults);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    api
      .search<{
        count: number;
        results: CharacterDetailsProps[];
      }>('people', query, page)
      .then((json) => {
        setCharacters(json.results);
        setTotalPages(Math.ceil(json.count / 10) || 0);
        dispatch(setIsLoading(false));
      });
  }, [query, page, dispatch]);

  return (
    <div className='flex flex-col'>
      <Paginator
        currentPage={page}
        totalPages={totalPages}
        pageClickHandler={(page) => {
          dispatch(setDetails(null));
          dispatch(setPage(page));
        }}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-row'>
          <div className='flex-item'>
            {characters.map((character, index) => (
              <CharacterCard
                key={index}
                {...character}
                active={details != null && details == index}
                onClick={() => dispatch(setDetails(details == index ? null : index))}
              />
            ))}
          </div>

          {details != null && !isLoading ? (
            <div className='flex-item'>
              <CharacterDetails {...characters[details]} closeDetails={() => dispatch(setDetails(null))} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
