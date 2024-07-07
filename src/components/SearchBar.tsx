import './SearchBar.css';

import { Component } from 'react';

type SearchBarProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

class SearchBar extends Component<SearchBarProps> {
  state: { searchTerm: string; shouldBlowUp: boolean } = {
    searchTerm: this.props.searchTerm,
    shouldBlowUp: false,
  };

  render() {
    if (this.state.shouldBlowUp) {
      throw new Error('App has been blown up.');
    }
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onSearch(this.state.searchTerm);
        }}
      >
        <span>
          <input
            className='form-control'
            value={this.state.searchTerm}
            onChange={(event) => {
              this.setState({ searchTerm: event.target.value });
            }}
          ></input>
        </span>
        <button type='submit' className='form-control'>
          Search
        </button>
        <button onClick={() => this.setState({ shouldBlowUp: true })} className='form-control'>
          Boom!
        </button>
      </form>
    );
  }
}

export default SearchBar;
