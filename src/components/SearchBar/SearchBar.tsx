import { useDispatch, useSelector } from 'react-redux';
import './SearchBar.css';

import { useState } from 'react';
import { setValue } from '../../state/searchBar/searchBarSlice';
import { RootState } from '../../state/store';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

function SearchBar(props: SearchBarProps) {
  const [shouldBlowUp, setShouldBlowUp] = useState(false);

  const value = useSelector((state: RootState) => state.searchBar.value);
  const dispatch = useDispatch();

  if (shouldBlowUp) {
    throw new Error('App has been blown up.');
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSearch(value);
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
      <button onClick={() => setShouldBlowUp(true)} className='form-control'>
        Boom!
      </button>
    </form>
  );
}

export default SearchBar;
