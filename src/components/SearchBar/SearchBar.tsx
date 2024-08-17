import { useDispatch, useSelector } from 'react-redux';
import './SearchBar.css';

import { setValue } from '../../state/searchBar/searchBarSlice';
import { setQuery } from '../../state/searchResults/searchResultsSlice';
import { RootState } from '../../state/store';

const SearchBar = () => {
  const value = useSelector((state: RootState) => state.searchBar.value);
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(setQuery(value));
      }}
    >
      <span>
        <input
          className='form-control'
          value={value}
          onChange={(event) => dispatch(setValue(event.target.value))}
        ></input>
      </span>
      <button type='submit' className='form-control'>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
