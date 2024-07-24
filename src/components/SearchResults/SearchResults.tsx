import CharacterCard from '../CharacterCard/CharacterCard';
import Loader from '../Loader/Loader';
import Paginator from '../Paginator/Paginator';

import { useSelector } from 'react-redux';
import { swApi } from '../../services/swApi/sw';
import { RootState } from '../../state/store';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import SelectionFlyout from '../SelectionFlyout/SelectionFlyout';

const SearchResults = () => {
  const { query, page, details } = useSelector((state: RootState) => state.searchResults);

  const { isFetching, data: { count, results: people, next } = { count: 0, results: [], next: null } } =
    swApi.useSearchPeopleQuery({
      search: query,
      page,
    });

  return (
    <>
      <div className='flex flex-col'>
        <Paginator
          currentPage={page}
          totalPages={count == 0 ? 0 : next == null ? page : Math.ceil(count / people.length)}
        />
        {isFetching ? (
          <Loader />
        ) : (
          <div className='flex flex-row'>
            <div className='flex-item'>
              {people.map((person, index) => (
                <CharacterCard key={index} index={index} character={person} />
              ))}
            </div>

            {details != null && people[details] && !isFetching ? (
              <CharacterDetails character={people[details]} />
            ) : null}
          </div>
        )}
      </div>
      <SelectionFlyout />
    </>
  );
};

export default SearchResults;
