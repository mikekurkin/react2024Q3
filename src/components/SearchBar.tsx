import './SearchBar.css';

import { useState } from 'react';

type SearchBarProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

function SearchBar(props: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(props.searchTerm);
  const [shouldBlowUp, setShouldBlowUp] = useState(false);

  if (shouldBlowUp) {
    throw new Error('App has been blown up.');
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSearch(searchTerm);
      }}
    >
      <span>
        <input
          className='form-control'
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
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
